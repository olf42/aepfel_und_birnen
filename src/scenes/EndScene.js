import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'EndScene' })
    }

    create () {
        const quote = this.sys.game.gc.story[3]


        this.quote = this.add.text(300, 180, '"'+quote+'"', {
            font: '24px Bree Serif',
            fill: '#888888'
        })

        setTimeout(() => {
            this.citation = this.add.text(450, 320, '- Karl Marx u. Friedrich Engels\n Die heilige Familie oder Kritik der kritischen Kritik', {
                font: '20px Bree Serif',
                fill: '#888888'
            })
        }, 4000)



        setTimeout(() => {
            this.text = this.add.text(100, 450, "Das Spiel ist aus! Guten Appetit!", {
                font: '56px Ultra',
                fill: '#4e678e'
            })
        }, 6000)

    }
}
