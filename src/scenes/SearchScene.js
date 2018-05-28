import Phaser from 'phaser'
import Countdown from '../gui/Countdown'

export default class extends Phaser.Scene{
    constructor () {
        super({ key: 'SearchScene' })

        this.countdown_rest = 0

        this.difficulty = 1
    }

    create () {
        this.appleGroup = this.add.group()
        this.apples = []

        this.nApples = 30 + this.difficulty * 5

        this.pearLayer = 30

        for (let i = 0; i < this.nApples; i++) {

            const tweendepth = this.difficulty * 3

            if (i === this.pearLayer) {
                const x = Phaser.Math.Between(30, 1180)
                const y = Phaser.Math.Between(30, 690)
                const rotation = Phaser.Math.Between(0, 360)
                this.pear = this.add.image(x, y, this.sys.game.im.random('pears'))
                this.pear.setRotation(rotation)
                this.pear.setInteractive()

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
            }

            const x = Phaser.Math.Between(30, 1180)
            const y = Phaser.Math.Between(30, 690)
            const scale = Phaser.Math.FloatBetween(0.6, 0.85)
            const rotation = Phaser.Math.Between(0, 360)
            this.apples[i] = this.appleGroup.create(x, y, this.sys.game.im.random('apples'))
            this.apples[i].setScale(scale)
            this.apples[i].setRotation(rotation)

            this.appleTween = this.tweens.add({
                targets: this.apples[i],
                x: x + Phaser.Math.Between(-tweendepth, tweendepth),
                y: y + Phaser.Math.Between(-tweendepth, tweendepth),
                ease: function (t) {
                    return Math.pow(Math.sin(t * 3), 3);
                },
                duration: 1000,
                repeat: -1,
            })

        }


        this.pear.on('pointerup', (event) => {

            // stop countdown
            this.countdown.running = false
            this.countdown_rest = this.countdown.duration

            // display score point
            const pointScore = this.add.text(this.pear.x+20, this.pear.y+20, "+50", {
                font: '56px Ultra',
                fill: '#4e678e'
         })
            this.score = {
                text: pointScore,
                duration: 600
            }
        })

        this.countdown = new Countdown(this, 5 + this.countdown_rest)

    }

    update (time, delta) {
        this.countdown.update(delta)
        if (this.countdown.duration < 0) {
            this.difficulty = 1
            this.countdown_rest = 0
            this.scene.start('MenuScene')
        }

        if (this.difficulty > 2) {
            for (const apple of this.apples) {
                apple.rotation += Phaser.Math.FloatBetween(0.01, 0.05)
            }
            this.pear.rotation += Phaser.Math.FloatBetween(0.01, 0.05)
        }
        this.updateScorePoint(delta)
    }

    updateScorePoint(delta) {
        if (this.score) {
            this.score.duration -= delta
            this.score.text.alpha -= delta/1000

            if (this.score.duration < 0) {
                this.score.text.destroy()
                this.score = null

                this.scene.restart()
                this.difficulty += 1
            }
        }
    }
}
