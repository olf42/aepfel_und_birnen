import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'EndScene' })
    }

    create () {
        const quote = this.sys.game.gc.story[3]

        this.frame = this.add.image(610,260, 'frame02').setScale(1).setAlpha(0)

        this.quote = this.add.text(320, 160, quote, {
            font: '24px Bree Serif',
            fill: '#888888'
        }).setAlpha(0)

        this.citation = this.add.text(450, 320, '- Karl Marx u. Friedrich Engels\n Die heilige Familie oder Kritik der kritischen Kritik', {
            font: '20px Bree Serif',
            fill: '#888888'
        }).setAlpha(0)
    
        this.tweens.add({
            targets: [ this.frame, this.quote, this.citation ],
            alpha: 1,
            ease: 'Linear',
            duration: 2000,
        })


        setTimeout(() => {
            this.text = this.add.text(100, 490, "Das Spiel ist aus! Guten Appetit!", {
                font: '56px Ultra',
                fill: '#4e678e'
            })
        }, 6000)

    }
}
