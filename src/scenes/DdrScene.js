import Phaser from 'phaser'
import WinkingLady from '../images/WinkingLady'
import Instructions from '../images/Instructions'
import { randomSpacedValues } from '../utils'
import GameScore from '../gui/GameScore'

export default class extends Phaser.Scene {
    constructor () {
        super({ "key": "DdrScene" })
    }

    create () {
        this.start = false

        // get game center coordinates
        const centerX = this.sys.game.config.width / 2
        const centerY = this.sys.game.config.height / 2

        // level config
        this.misses = 10
        this.velocity = 3
        this.appleKey = this.sys.game.im.random("apples")
        this.cooldown = 1000

        //music
        this.music = this.sys.game.ac.play(this, 'ddr')


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
        this.bgApple1.setScale(0.6)
        this.bgApple1.setAlpha(0.5)        
        this.bgApple2 = this.add.image(600,600, this.appleKey)
        this.bgApple2.setScale(0.6)
        this.bgApple2.setAlpha(0.5)
        this.bgApple3 = this.add.image(800,600, this.appleKey)
        this.bgApple3.setScale(0.6)
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
    }

    keyPressed (queue) {
        let i = 0
        let hit = false
        for (let apple of queue.apples) {
            if ((apple.y <= 605) && (apple.y >= 595)) {
                apple.destroy()
                queue.apples.splice(i, 1)
                this.addScorePoint(queue.x)
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
        let text = this.add.text(x+20, 550, "+50", {
            font: '56px Ultra',
            fill: '#4e678e'
        })
        this.scorePoints.push({
            text: text,
            duration: 1000
        })
    }

    update (time, delta) {

        //update gui elements
        this.scoreGui.update(time, delta)

        this.cooldown -= delta
        if (this.cooldown < 0) {
            let chance = Phaser.Math.Between(0, 2)
            console.log("add apple")
            switch (chance) {
                case 0:
                    this.addAppleToQueue(this.aQueue)
                    break
                case 1:
                    this.addAppleToQueue(this.sQueue)  
                    break
                case 2:
                    this.addAppleToQueue(this.dQueue)
                    break
            }
            this.cooldown = 1000
        }

        this.updateQueue(this.aQueue)
        this.updateQueue(this.sQueue)
        this.updateQueue(this.dQueue) 

        this.updateScorePoints(delta)


        if (this.misses === 0) {
            this.scene.start('ScoreScene')
        }

    }
    
    addAppleToQueue(queue) {
        let apple = this.add.image(queue.x, 30, this.appleKey)
        apple.setScale(0.5)
        apple.setRotation(Phaser.Math.Between(0, 360    ))
        queue.apples.push(apple)
    }

    updateQueue(queue) {
        // console.log(queue.apples.length)
        for (let apple of queue.apples) {
            apple.y += this.velocity
            apple.rotation += 0.02
        }
        if (queue.apples.length > 0) {
            if (queue.apples[0].y > 800) {
                queue.apples[0].destroy()
                queue.apples.shift()
            }
        }
    }

    updateScorePoints(delta) {
        for (let points of this.scorePoints) {
            points.duration -= delta
            points.text.alpha -= delta/1000
        }
        if (this.scorePoints.lengths > 0) {
            if (this.scorePoints[0].duration < 0) {
                this.scorePoints.text.destroy()
                this.scorePoints.shift()
            }
        }
    }
}