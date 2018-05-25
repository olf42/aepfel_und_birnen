import Phaser from 'phaser'
import Countdown from '../gui/Countdown'

export default class extends Phaser.Scene{
    constructor () {
        super({ key: 'SearchScene' })
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
            const scale = Phaser.Math.FloatBetween(0.7, 0.9)
            const rotation = Phaser.Math.Between(0, 360)
            this.apples[i] = this.appleGroup.create(x, y, this.sys.game.im.random('apples'))
            this.apples[i].setScale(scale)
            this.apples[i].setRotation(rotation)
        }

        this.pear.on('pointerup', (event) => {
            this.scene.restart()
        })

        this.countdown = new Countdown(this, 5)

    }

    update (time, delta) {
        this.countdown.update(delta)
        if (this.countdown.duration < 0) {
            this.scene.start('MenuScene')
        }

        for (let i = 0; i < 50; i++) {
            var rotation = this.apples[i].rotation
            if (rotation === 360) {
                rotation = 0
            }
            this.apples[i].setRotation(rotation+Phaser.Math.Between(0.01, 0.05))
            if ( i == 0 ) {
                this.pear.setRotation(this.pear.rotation+Phaser.Math.Between(0.01, 0.05))
            }
        }
    }
}
