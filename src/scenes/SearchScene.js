import Phaser from 'phaser'
import Countdown from '../gui/Countdown'
import ScreenMessages from '../gui/ScreenMessages'
import GameScore from '../gui/GameScore'

export default class extends Phaser.Scene{
    constructor () {
        super({ key: 'SearchScene' })

        this.countdown_rest = 0
        this.found = false
        this.difficulty = 1

        this.score = 0

        this.hsv = Phaser.Display.Color.HSVColorWheel()
    }

    create () {

        this.messages = new ScreenMessages(this)

        // this.cameras.main.setBackgroundColor(0xcfc4ae)
        //this.search_score = this.add.text(20, 20, this.sys.game.gc.score)

        this.appleGroup = this.add.group()
        this.apples = []
        this.nApples = 30 + this.difficulty * 5
        this.pearLayer = 30

        for (let i = 0; i < this.nApples; i++) {

            const tweendepth = this.difficulty * 20

            if (i === this.pearLayer) {
                const x = Phaser.Math.Between(30, 1180)
                const y = Phaser.Math.Between(30, 690)
                const rotation = Phaser.Math.Between(0, 360)

                setTimeout( () => {
                    //let color = Phaser.Math.Between(0, 256)
                    this.pear = this.add.image(x, y, this.sys.game.im.random('pears'))
                    this.pear.setRotation(rotation)
                    this.pear.setInteractive()//.setPipeline('SolidColor')
                    this.pear.setTint(this.hsv[Phaser.Math.Between(0,359)].color).setAlpha(0.9)

                    if (this.difficulty > 5) {
                        this.pear.setAlpha(0.8)
                    }

                    this.pearTween = this.tweens.add({
                        targets: this.pear,
                        x: x + Phaser.Math.Between(-tweendepth, tweendepth),
                        y: y + Phaser.Math.Between(-tweendepth, tweendepth),
                        ease: function (t) {
                            return Math.pow(Math.sin(t * 3), 3);
                        },
                        duration: 1000,
                        repeat: -1,
                    })
                }, i*10)
            }
            

            const x = Phaser.Math.Between(30, 1180)
            const y = Phaser.Math.Between(30, 690)
            const scale = Phaser.Math.FloatBetween(0.6, 0.85)
            const rotation = Phaser.Math.Between(0, 360)

            setTimeout( () => {
                this.apples[i] = this.appleGroup.create(x, y, this.sys.game.im.random('apples'))
                this.apples[i].setScale(scale)
                //let color = Phaser.Math.Between(0, 256)
                this.apples[i].setRotation(rotation)//.setPipeline('SolidColor')
                this.apples[i].setTint(this.hsv[Phaser.Math.Between(0,359)].color).setAlpha(0.9)

                if (this.difficulty > 5) {
                    this.apples[i].setAlpha(0.8)
                }
                this.appleTween = this.tweens.add({
                    targets: this.apples[i],
                    x: x + Phaser.Math.Between(-tweendepth, tweendepth),
                    y: y + Phaser.Math.Between(-tweendepth, tweendepth),
                    ease: function (t) {
                        return Math.pow(Math.sin(t * 3), 3);
                    },
                    duration: 1000,
                    delay: Phaser.Math.Between(0, 200),
                    repeat: -1,
                })
            }, i * 10)
        }


        setTimeout(() => {
            this.input.on('pointerup', (event) => {
                if ((event.x <= this.pear.x-120 || event.x >= this.pear.x+120) || (event.y <= this.pear.y-120 || event.y >= this.pear.y+120)) {
                    this.cameras.main.shake(300)
                    this.messages.add(event.x+20, event.y, "-50", "#ff2222", 50, 1000)
                    // this.sys.game.gc.score -= 50
                    this.score -= 50
                    //this.search_score.setText(this.sys.game.gc.score)
                }
    
    
            })
    
            this.pear.on('pointerup', (event) => {
    
                if (this.countdown.running) {
                    //this.sys.game.gc.score += 50
                    //this.search_score.setText(this.sys.game.gc.score)
                    this.score += 50

                    // stop countdown
                    this.countdown.running = false
                    this.countdown_rest = this.countdown.duration
    
                    this.messages.add(event.x+20, event.y, "+50", "#4e678e", 56, 1000)
    
                    setTimeout(() => { 
                        this.difficulty += 1
                        this.scene.restart() 
                    }, 600)
    
                }
    
            })
        }, 1000)


        this.countdown = new Countdown(this, 5 + this.countdown_rest)
        this.scoreGui = new GameScore(this)

    }

    update (time, delta) {
        //update gui elements
        this.countdown.update(delta)
        this.scoreGui.update(time, delta)

        if (this.countdown.duration < 0) {
            this.difficulty = 1
            this.countdown_rest = 0

            this.sys.game.gc.addScore('Die Suche', this.score)

            this.scene.start('ScoreScene')
        }

        if (this.difficulty > 2) {
            for (const apple of this.apples) {
                apple.rotation += Phaser.Math.FloatBetween(0.01, 0.05)
            }
            this.pear.rotation += Phaser.Math.FloatBetween(0.01, 0.05)
        }

        this.messages.update(time, delta)
    }
}
