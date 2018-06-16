import Phaser from 'phaser'
import Countdown from '../gui/Countdown'
import ScreenMessages from '../gui/ScreenMessages'
import GameScore from '../gui/GameScore'
import { congratulations, encouragement, hurry } from '../texts/ScreenMessages'
import { randomColor, colors } from '../utils'
import { sample } from 'lodash'

export default class extends Phaser.Scene {
    constructor() {
        super({ key: 'SearchScene' })

        this.countdown_rest = 0
        this.difficulty = 1
        this.score = 0

        this.hsv = Phaser.Display.Color.HSVColorWheel()
        this.config = {}

    }

    addObjectTween(obj) {
        this.tweens.add({
            targets: obj,
            x: obj.x + Phaser.Math.Between(-this.config.tween, this.config.tween),
            y: obj.y + Phaser.Math.Between(-this.config.tween, this.config.tween),
            ease: function (t) {
                return Math.pow(Math.sin(t * 3), 3);
            },
            duration: 1000,
            repeat: -1,
        })
    }

    configTint(obj) {
        switch (this.config.tint) {
            case 1:
                obj.setTint(randomColor())
                break
            case 2:
                obj.setTint(randomColor(), randomColor())
                break
        }
    }

    configRenderer(obj) {
        switch (this.config.renderer) {
            case 'solid':
                obj.setPipeline('SolidColor')
                break
        }
    }

    addPear(i) {
        const x = Phaser.Math.Between(30, 1180)
        const y = Phaser.Math.Between(30, 690)
        const rotation = Phaser.Math.Between(0, 360)

        this.time.delayedCall(i * 10, () => {
            this.pear = this.add.image(x, y, this.sys.game.im.random('pears'))
            this.pear.setRotation(rotation).setInteractive()//.setPipeline('SolidColor')
            this.pear.setAlpha(this.config.alpha)
            this.configRenderer(this.pear)
            this.configTint(this.pear)
            this.addObjectTween(this.pear)
        })
    }

    addApple(i) {
        const x = Phaser.Math.Between(30, 1180)
        const y = Phaser.Math.Between(30, 690)
        const scale = Phaser.Math.FloatBetween(0.6, 0.85)
        const rotation = Phaser.Math.Between(0, 360)

        this.time.delayedCall(i * 10, () => {
            this.apples[i] = this.appleGroup.create(x, y, this.sys.game.im.random('apples'))
            this.apples[i].setScale(scale)
            this.apples[i].setRotation(rotation)
            this.apples[i].setAlpha(this.config.alpha)
            this.configRenderer(this.apples[i])
            this.configTint(this.apples[i])
            this.addObjectTween(this.apples[i])

        })
    }

    setupConfig() {
        // std config
        this.config = {
            n: 30 + this.difficulty * 5,
            alpha: 1,
            renderer: 'normal',
            tint: 0,
            tween: this.difficulty * 15,
            rotation: false
        }

        // change configuration based on difficulty

        if (this.difficulty >= 3) {
            this.config.rotation = true
        }

        if (this.difficulty >= 4 && this.difficulty < 7) {
            this.config.alpha = 0.8
        }
        if (this.difficulty >= 7) {
            this.config.alpha = 0.8
            this.config.tint = 1
        }
7
        if (this.difficulty >= 10) {
            this.config.renderer = sample(['normal', 'solid'])
            switch (this.config.renderer) {
                case 'normal':
                    this.config.alpha = 0.8
                    this.config.tint = Phaser.Math.Between(1,2)
                    break
                case 'solid':
                    this.config.alpha = 0.8
                    this.config.tint = 2
                    break
            }
        }
        if (this.diffculty >= 14) {
            this.config.renderer = sample(['normal', 'solid', 'solid', 'solid'])
            this.config.tint = sample([1,1,2])
            this.alpha = 0.9
        }

        // max 200 objects on screen
        if (this.config.n > 200) {
            this.config.n = 200
        }
    }

    create() {

        // setup level difficulty
        this.setupConfig()
        this.hurryMessageCooldown = 2000

        // add game objects
        this.appleGroup = this.add.group()
        this.apples = []
        this.pearLayer = 30

        for (let i = 0; i < this.config.n; i++) {
            if (i === Math.ceil(this.config.n/2)) {
                this.addPear(i)
            }
            this.addApple(i)
        }

        // set up input handling
        setTimeout(() => {

            this.input.on('pointerup', (event) => {
                if ((event.x <= this.pear.x - 120 || event.x >= this.pear.x + 120) || (event.y <= this.pear.y - 120 || event.y >= this.pear.y + 120)) {
                    this.cameras.main.shake(300)
                    this.messages.add(event.x + 20, event.y, "-50", "#ff2222", 70, 1000)
                    this.score -= 50
                }
            })

            this.pear.on('pointerup', (event) => {

                if (this.countdown.running) {
                    //update score
                    this.score += 50
                    this.messages.add(event.x + 20, event.y, "+50", sample(colors), 70, 1000)

                    // stop countdown
                    this.countdown.running = false
                    this.countdown_rest = this.countdown.duration

                    // restart leven in next difficulty
                    setTimeout(() => {
                        this.difficulty += 1
                        this.scene.restart()
                    }, 600)

                }

            })
        }, 1000)

        // add gui and screen objetcs
        this.countdown = new Countdown(this, 5 + this.countdown_rest)
        this.scoreGui = new GameScore(this)
        this.messages = new ScreenMessages(this)
    }

    update(time, delta) {
        //update gui and screen elements
        this.countdown.update(delta)
        this.scoreGui.update(time, delta)
        this.messages.update(time, delta)

        // update game objects
        if (this.config.rotation) {
            for (const apple of this.apples) {
                apple.rotation += Phaser.Math.FloatBetween(0.01, 0.05)
            }
            this.pear.rotation += Phaser.Math.FloatBetween(0.01, 0.05)
        }

        // check game end condition
        if (this.countdown.duration < 0) {
            // reset game config
            this.difficulty = 1
            this.countdown_rest = 0
            // save score and and move on
            this.sys.game.gc.addScore('Die Suche', this.score)
            this.scene.start('ScoreScene')
        }

        // random screen messages
        this.hurryMessageCooldown -= delta
        if (this.countdown.duration < 7 && this.hurryMessageCooldown < 0) {
            const chance = Phaser.Math.Between(0,600) 
            if (chance > 590) {
                this.messages.add(Phaser.Math.Between(350,700), Phaser.Math.Between(250,450), sample(hurry), sample(colors), 70, 1000)
                this.hurryMessageCooldown = 3500
            }
        }
    }
}
