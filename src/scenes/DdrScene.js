import Phaser from 'phaser'
import WinkingLady from '../images/WinkingLady'
import { randomSpacedValues } from '../utils'
import GameScore from '../gui/GameScore'
import ScreenMessages from '../gui/ScreenMessages'

export default class extends Phaser.Scene {
    constructor () {
        super({ "key": "DdrScene" })
    }

    create () {
        this.start = false

        this.messages = new ScreenMessages(this)
        // get game center coordinates
        const centerX = this.sys.game.config.width / 2
        const centerY = this.sys.game.config.height / 2

        // level config
        this.misses = 500
        this.velocity = 3
        this.appleKey = this.sys.game.im.random("apples")


        // beats queues
        this.aQueue = {
            x: 400,
            apples: []
        }
        this.sQueue = {
            x: 600,
            apples: []
        }
        this.dQueue = {
            x: 800,
            apples: []
        }
        
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

        // score graphics queue
        this.scorePoints = []

        // markers
        this.bgApple1 = this.add.image(400,600, this.appleKey)
        this.bgApple1.setScale(0.4)
        this.bgApple1.setAlpha(0.5)        
        this.bgApple2 = this.add.image(600,600, this.appleKey)
        this.bgApple2.setScale(0.4)
        this.bgApple2.setAlpha(0.5)
        this.bgApple3 = this.add.image(800,600, this.appleKey)
        this.bgApple3.setScale(0.4)
        this.bgApple3.setAlpha(0.5)

        this.winkingLady = new WinkingLady(this, 30,300)
        //this.instructions = new Instructions(this, centerX, centerY)

        // input
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

        this.baum = this.add.image(650, 320, 'baum')
        this.baum.setScale(0.7)
        this.baum.setAlpha(0.2)
        this.baum.setDepth(0)

        this.scoreGui = new GameScore(this)

        //music
        this.music = this.sys.game.ac.play(this, '120bpm')
        console.log(this.music)

        this.beatCount = 0 

        // this.beatEvent = this.time.addEvent({
        //     delay: 500,
        //     callback: () => { 
        //         console.log(this.music.source.context.currentTime-this.music.startTime)
        //         this.addAppleToQueue(this.aQueue) 
        //         this.bgApple1.rotation += 90
        //     },
        //     callbackScope: this,
        //     repeat: -1
        // })        
    }

    keyPressed (queue) {
        let i = 0
        let hit = false
        for (let apple of queue.apples) {
            if ((apple.obj.y <= 630) && (apple.obj.y >= 570)) {
                this.sys.game.gc.score += 10
                this.messages.add(queue.x+20, 400, "+10", "#ef3483", 64, 500)
                apple.obj.destroy()
                queue.apples.splice(i, 1)
                hit = true
                break
            }
            i++
        }
        if (!hit) {
            this.misses --
        }
    } 


    addScorePoint (x) {
        this.sys.game.gc.score += 10
        let text = this.add.text(x+20, 550, "+10", {
            font: '56px Ultra',
            fill: '#4e678e'
        })
        this.scorePoints.push({
            text: text,
            duration: 1000
        })
    }

    update (time, delta) {
        
        const elapsed = this.music.source.context.currentTime - this.music.startTime
        //console.log(elapsed)
        const diff =  elapsed*1000 - (this.beatCount + 1) *1000
        if (diff >= 0) {
            this.beatCount++
            this.addAppleToQueue(this.aQueue)
        }


        this.messages.update(time, delta)
        //update gui elements
        this.scoreGui.update(time, delta)

        if (this.misses === 0) {
            this.scene.start('ScoreScene')
        }
        this.updateQueue(this.aQueue)
    }

    updateQueue(queue) {
        //console.log(queue)
        for (const apple of queue.apples) {
            const diff = this.music.source.context.currentTime - apple.start 
            const pixelPerMs = 1000/2000
            apple.obj.y += pixelPerMs * diff
        }
    }
    
    addAppleToQueue(queue) {
        this.bgApple1.rotation += 90
        this.bgApple2.rotation += 90
        this.bgApple3.rotation += 90
        let apple = this.add.image(queue.x, -390, this.appleKey)
        apple.setScale(0.3)
        apple.setRotation(Phaser.Math.Between(0, 360 ))
        queue.apples.push({
            obj: apple,
            // tween: this.add.tween({
            //     delay: 0,
            //     targets: apple,
            //     ease: 'normal',
            //     y: 1600,
            //     duration: 8000,
            //     repeat: 0
            // }),
            start: this.music.source.context.currentTime
        })
    }
}