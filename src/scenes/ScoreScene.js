import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'ScoreScene' })
    }

    create () {
        const level = this.sys.game.gc.level - 1
        const quote = this.sys.game.gc.story[level]

        this.dude = this.add.image(250, 400, 'measureDude')

        this.text = this.add.text(800, 60, 'Punkte: '+this.sys.game.gc.score, {
            font: '56px Ultra',
            fill: '#4e678e'
        })

        this.quote = this.add.text(400, 140, '"'+quote+'"', {
            font: '16px Ultra',
            fill: '#888888'
        })

        this.next = this.add.text(640, 400, "Weiterspielen", {
            font: '56px Ultra',
            fill: '#4e678e'
        })

        this.next.setInteractive()
        this.next.on('pointerup', () => {
            this.scene.start(this.sys.game.gc.nextScene())
        })
    }
}
