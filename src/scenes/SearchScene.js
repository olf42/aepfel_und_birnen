import Phaser from 'phaser'
import Countdown from '../gui/Countdown'

export default class extends Phaser.Scene{
    constructor () {
        super({ key: 'SearchScene' })
    }

    create () {
        this.appleGroup = this.add.group()
        this.apples = []



        for (let i = 0; i < 20; i++) {

            if (i === 15) {
                const x = Phaser.Math.Between(30, 970)
                const y = Phaser.Math.Between(30, 720)
                const rotation = Phaser.Math.Between(0, 360)                
                this.pear = this.add.image(x, y, this.sys.game.im.random('pears'))
                this.pear.setRotation(rotation)
                this.pear.setInteractive()
            }

            const x = Phaser.Math.Between(30, 970)
            const y = Phaser.Math.Between(30, 720)
            const scale = Phaser.Math.FloatBetween(0.4, 1)
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
    }
}