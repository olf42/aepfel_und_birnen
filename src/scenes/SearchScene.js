import Phaser from 'phaser'
import Countdown from '../gui/Countdown'

export default class extends Phaser.Scene{
    constructor () {
        super({ key: 'SearchScene' })

        this.difficulty = 1
    }

    create () {
        this.appleGroup = this.add.group()
        this.apples = []

        for (let i = 0; i < 50; i++) {

            if (i === 45) {
                const x = Phaser.Math.Between(30, 970)
                const y = Phaser.Math.Between(30, 720)
                const rotation = Phaser.Math.Between(0, 360)
                this.pear = this.add.image(x, y, this.sys.game.im.random('pears'))
                this.pear.setRotation(rotation)
                this.pear.setInteractive()
            }

            const x = Phaser.Math.Between(0, 1024)
            const y = Phaser.Math.Between(0, 768)
            const scale = Phaser.Math.FloatBetween(0.6, 0.85)
            const rotation = Phaser.Math.Between(0, 360)
            this.apples[i] = this.appleGroup.create(x, y, this.sys.game.im.random('apples'))
            this.apples[i].setScale(scale)
            this.apples[i].setRotation(rotation)
        }

        this.pear.on('pointerup', (event) => {
            this.difficulty += 1
            this.scene.restart()
        })

        this.countdown = new Countdown(this, 5)

    }

    update (time, delta) {
        this.countdown.update(delta)
        if (this.countdown.duration < 0) {
            this.scene.start('MenuScene')
        }

        if (this.difficulty > 2) {
            for (let i = 0; i < 50; i++) {
                this.apples[i].rotation += Phaser.Math.Between(0.01, 0.05)
                if ( i == 0 ) {
                    this.pear.rotation += Phaser.Math.Between(0.01, 0.05)
                }
            }
        }

    }
}
