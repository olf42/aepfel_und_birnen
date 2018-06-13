import Phaser from 'phaser'
import WinkingLady from '../images/WinkingLady'
import PsychedelicFiler from '../images/PsychedelicFilter'

import RatingBar from './ddr/RatingBar'
import { randomSpacedValues } from '../utils'

import GameScore from '../gui/GameScore'
import ScreenMessages from '../gui/ScreenMessages'
import PsychedelicFilter from '../images/PsychedelicFilter';

export default class extends Phaser.Scene {
    constructor () {
        super({ "key": "DdrScene" })

        this.score = 0
    }

    create () {

        // filters
        this.psychedelicFilter = new PsychedelicFilter()

        // level config
        this.misses = 50
        this.appleKey = this.sys.game.im.random("apples")

        this.difficulty = {
            tracks: 1,
            chance: 1,
            beat: 2
        }

        // setup level bg and  deco graphics
        this.blattGroup = this.add.group()
        this.blaetter = []

        for (let i = 0; i < 6; i++) {
            const xPositions = randomSpacedValues(150, 1124, 3, 140) 
            xPositions.forEach((x, i) => {
                const rotation = Phaser.Math.Between(0, 180)
                this.blaetter[i] = this.blattGroup.create(x, 0, 'blatt')
                this.blaetter[i].setDepth(4)
                this.blaetter[i].setRotation(rotation)
            })
            this.blattTween = this.tweens.add({
                targets: this.blaetter[i],
                x: xPositions[i]+5,
                ease: 'Stepped',
                easeParams: [ 10 ],
                duration: 200,
                yoyo: true,
                repeat: -1,
                repeatDelay: 1200,
                delay: Phaser.Math.Between(0, 500)
            })
        }

        this.baum = this.add.image(650, 320, 'baum')
        this.baum.setScale(0.7)
        this.baum.setAlpha(0.2)
        this.baum.setDepth(0)        

        this.winkingLady = new WinkingLady(this, 180,400)


        // setup queus and beat markers
        this.aQueue = {
            x: 500,
            apples: []
        }
        this.sQueue = {
            x: 675,
            apples: []
        }
        this.dQueue = {
            x: 850,
            apples: []
        }
        
        this.bgApple1 = this.add.image(this.aQueue.x, 600, this.appleKey)
        this.bgApple1.setScale(0.4).setAlpha(0.5)        
        this.bgApple2 = this.add.image(this.sQueue.x, 600, this.appleKey)
        this.bgApple2.setScale(0.4).setAlpha(0.5)
        this.bgApple3 = this.add.image(this.dQueue.x, 600, this.appleKey)
        this.bgApple3.setScale(0.4).setAlpha(0.5)

        //gui
        this.messages = new ScreenMessages(this)
        this.scoreGui = new GameScore(this, '#ff748f', 950)
        this.ratingBar = new RatingBar(this, 1100, 380, this.misses)


        //music
        this.music = this.sys.game.ac.play(this, '120bpm')
        this.beatCount = 0     


        // input handler
        this.input.keyboard.on('keydown', (event) => {
            this.winkingLady.wink()
            switch (event.key) {
                case "d":
                    this.keyPressed(this.dQueue)
                    break
                case "s":
                    this.keyPressed(this.sQueue)
                    break
                case "a":
                    this.keyPressed(this.aQueue)
                    break
            }    
        })        
    }

    keyPressed (queue) {
        let i = 0
        let hit = false
        for (let apple of queue.apples) {
            if ((apple.obj.y <= 630) && (apple.obj.y >= 570)) {
                // this.sys.game.gc.score += 10
                this.score += 10
                this.messages.add(queue.x+20, 450, "+10", "#ef3483", 64, 500)
                apple.obj.destroy()
                queue.apples.splice(i, 1)
                hit = true
                break
            }
            i++
        }
        if (!hit) {
            this.score -= 5
            this.messages.add(queue.x+20, 450, "-5", "#ef3483", 64, 500)
            this.misses -= 8
            this.ratingBar.updateLevel(this.misses)
        }
        else {
            if (this.misses < 100) {
                this.misses += 2
                this.ratingBar.updateLevel(this.misses)
            }
        }
    } 

    updateQueue(queue) {
        // calculate new position for each apple element in beat queue
        if (queue.apples.length > 0) {
            for (const apple of queue.apples) {
                const diff = this.music.source.context.currentTime - apple.start 
                const pixelPerMs = 1000/2000
                apple.obj.y += pixelPerMs * diff
            }

            // remove apple element if outside of frame
            if (queue.apples[0].obj.y > 760) {
                this.misses -= 8
                this.ratingBar.updateLevel(this.misses)
                queue.apples[0].obj.destroy()
                queue.apples.shift()
            }
        }
    }
    
    addAppleToQueue (queue) {
        // rotate background apples
        this.bgApple1.rotation += 90
        this.bgApple2.rotation += 90
        this.bgApple3.rotation += 90

        // add new apple beat image
        let apple = this.add.image(queue.x, -390, this.appleKey)
        apple.setScale(0.3)
        apple.setRotation(Phaser.Math.Between(0, 360 ))
        queue.apples.push({
            obj: apple,
            start: this.music.source.context.currentTime
        })
    }

    updateDifficulty () {
        // change difficulty based and passed beats
        switch (this.beatCount) {
            case 20:
                this.difficulty.tracks = 2
                break
            case 40:
                this.difficulty.chance = 1.0
                break
            case 60:
                this.difficulty.tracks = 3
                this.difficulty.chance = 0.8
                break
            case 80:
                this.difficulty.beat = 1
                this.difficulty.chance = 0.6
                break
            case 100:
                this.difficulty.chance = 0.8
                break
            case 120:
                this.difficulty.chance = 1
                break
        }
    }

    update (time, delta) {

        // check elapsed song time for new beat
        const elapsed = this.music.source.context.currentTime - this.music.startTime
        const diff =  elapsed * 1000 - (this.beatCount + 1) * 500
        if (diff >= 0) {
            this.beatCount++
            this.winkingLady.pulse()
            this.updateDifficulty()
            if (this.beatCount % this.difficulty.beat === 0) {
                const track = Phaser.Math.Between(0, this.difficulty.tracks-1)
                const chance = Phaser.Math.FloatBetween(0, 1)
                if (chance > (1-this.difficulty.chance)) {
                    switch (track) {
                        case 0:
                            this.addAppleToQueue(this.sQueue)
                            break
                        case 1:
                            this.addAppleToQueue(this.sQueue)
                            break
                        case 2:
                            this.addAppleToQueue(this.sQueue)
                            break
                    }
                }
            }
        }

        // update gui + screene elements
        this.messages.update(time, delta)
        this.scoreGui.update(time, delta)

        this.winkingLady.update(time, delta)

        // check gameover condition
        if (this.misses <= 0) {
            this.sys.game.gc.addScore('Der Tanz', this.score)
            this.scene.start('ScoreScene')
        }

        // update apple beat queues
        this.updateQueue(this.aQueue)
        this.updateQueue(this.sQueue)
        this.updateQueue(this.dQueue)

        if (this.misses > 70) {
            for (const blatt of this.blaetter) {
                this.psychedelicFilter.apply(blatt)
            }
        }
        else {
            for (const blatt of this.blaetter) {
                this.psychedelicFilter.clear(blatt)
            }            
        }

        if (this.misses > 60) {
            this.winkingLady.disco = true
        }
        else {
            this.winkingLady.disco = false
        }
    }
}


