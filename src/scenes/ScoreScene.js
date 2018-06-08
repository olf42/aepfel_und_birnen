import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'ScoreScene' })
    }

    create () {
        const level = this.sys.game.gc.level - 1
        const quote = this.sys.game.gc.story[level]

        this.dude = this.add.image(250, 400, 'measureDude')



        this.quote = this.add.text(400, 200, '"'+quote+'"', {
            font: '24px Bree Serif',
            fill: '#888888'
        })

        this.score = this.add.text(640, 450, 'Punkte: '+this.sys.game.gc.score, {
            font: '48px Ultra',
            fill: '#4e678e'
        })
        this.score.setOrigin(0,0)

        this.next = this.add.text(640, 550, "Weiter", {
            font: '48px Ultra',
            fill: '#4e678e'
        })
        this.next.setOrigin(0,0)

        this.next.setInteractive()
        this.next.on('pointerup', () => {
            this.scene.start(this.sys.game.gc.nextScene())
        })
    }
}
