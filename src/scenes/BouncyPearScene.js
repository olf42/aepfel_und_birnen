import Phaser from 'phaser'
import { randomSpacedValues } from '../utils'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'BouncyPearScene' })

        this.level = 0
    }

    create () {

        this.state = "play"

        this.cameras.main.setBackgroundColor(0xcfc4ae)

        this.score = this.add.text(20, 20, this.sys.game.gc.score)

        // add pear obstacles
        this.pearGroup = this.physics.add.group({
            bounceX: 0,
            bounceY: 1,
            collideWorldBounds: true,
        })

        this.pears = []
        this.setupPears()

        // add player apple
        this.apple = this.physics.add.image(70, 440,  this.sys.game.im.random("apples"))
        this.apple.setCollideWorldBounds(true)
        this.apple.setInteractive()
        this.apple.setScale(0.35)
        this.apple.setBounce(0.3)
        this.apple.setCircle(105, 7, 7)
        this.apple.setDepth(3)

        this.velocity = 0
        // increase apple velocity on tab or jump with long tap
        this.jump = false
        this.input.on('pointerup', (event) => {
            const delta = event.upTime - event.downTime 
            if (delta < 200) {
                this.velocity += 35
                this.apple.setVelocityX(this.velocity)
            }
            else {
                this.jump = true
                this.velocity += 35
                this.apple.setVelocityX(200+(this.velocity/10))
                this.apple.setVelocityY(-230-(this.velocity/10))
            }

        })

        // add collision
        this.physics.add.collider(this.apple, this.pearGroup, () => {

            this.input.off('pointerup')
            this.apple.disableBody(true, true)
            this.cameras.main.shake(100)

            this.winText = this.add.text(512, 369, 'you failed', {
                font: '56px Ultra',
                fill: '#4e678e'
            })
            this.displayRetry()

        })

        this.tempel = this.add.image(650, 184, 'tempel')
        this.tempel.setAlpha(0.2)
        this.tempel.setDepth(0)

        this.ground = this.physics.add.staticImage(512, 768-100, 'ground1')
        this.ground.setDepth(1)
        this.physics.add.collider(this.pears, this.ground)
        this.physics.add.collider(this.apple, this.ground, () => {
            this.jump = false
        })

        this.krug_group = this.add.group()

        this.krug_bg = this.krug_group.create(1170, 710, 'krug_bg')
        this.krug_bg.setScale(1.0)
        this.krug_bg.setRotation(6)
        this.krug_bg.setDepth(2)

        this.krug = this.krug_group.create(1170, 710, 'krug')
        this.krug.setScale(1.0)
        this.krug.setRotation(6)
        this.krug.setDepth(4)

    }

    update (time, delta) {
        // gradually reduce apple velocity
        if (this.apple.body) {
            if (this.velocity > 0 && !this.jump) {
                this.velocity -= 1.5
                this.apple.setVelocityX(this.velocity)
                this.apple.rotation += this.velocity/4000
            }

        }

        if ((this.apple.y > 670) && (this.state === "play")) {
            // add welldone text
            this.input.off('pointerup')
            this.winText = this.add.text(512, 369, 'well done', {
                font: '56px Ultra',
                fill: '#4e678e'
            })

            //make krug move
            this.krugTween = this.tweens.add({
                targets: [this.krug, this.krug_bg],
                y: 720,
                ease: 'Power4',
                duration: 250,
                yoyo: true,
                repeat: 0
            })

            this.state = "end"

            this.sys.game.gc.score += 50
            this.score.setText(this.sys.game.gc.score)
            
            this.level++
            if (this.level === 2) {
                setTimeout(() => {
                    this.scene.start('ScoreScene')
                }, 300)
            }
            else {
                setTimeout(() => {
                    this.scene.restart()
                }, 300)
            }
        }

        for (const pear of this.pears) {
            if (pear.bounceY > 0.2)
                pear.rotation += 0.02
        }

    }

    displayRetry() {
        this.retry = this.add.text(512, 469, 'retry?', {
            font: '46px Ultra',
            fill: '#999999'
        }).setInteractive()

        this.retry.on('pointerup', (event) => {
            this.scene.restart()
        })
        this.retry.on('pointerover', (event) => {
            this.retry.setFill('#3e577e')
        })
        this.retry.on('pointerout', (event) => {
            this.retry.setFill('#999999',)
        })
    }


    setupPears () {
        this.pears = []
        if (this.level === 0) {
            const xPositions = randomSpacedValues(200, 850, 3, 150)
            xPositions.forEach((x, i) => {
                let y = Phaser.Math.Between(100, 400)
                let veloY = Phaser.Math.Between(200, 500)
                let scale = Phaser.Math.FloatBetween(0.3, 0.6)
                this.pears[i] = this.pearGroup.create(x, y, this.sys.game.im.random("pears"))
                this.pears[i].setVelocityY(veloY)
                this.pears[i].setScale(scale)
                this.pears[i].setRotation(Phaser.Math.Between(0,360))
                this.pears[i].setCircle(80, 15, 20)
                this.pears[i].setDepth(3)
            })
        }
        else {  
            const xPositions = [ Phaser.Math.Between(400,700) ]
            xPositions.forEach((x, i) => {
                let y = 300
                this.pears[i] = this.pearGroup.create(x, y, this.sys.game.im.random("pears"))
                this.pears[i].setScale(0.2)
                this.pears[i].setRotation(Phaser.Math.Between(0,360))
                this.pears[i].setCircle(80, 15, 20)
                this.pears[i].setDepth(3)
                this.pears[i].setBounce(0.2)
            })
            
        }
    }

}
