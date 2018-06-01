import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'ScoreScene' })
    }

    create () {

        this.dude = this.add.image(250, 400, 'measureDude')

        this.text = this.add.text(640, 70, 'Punkte: '+this.sys.game.gc.score, {
            font: '56px Ultra',
            fill: '#4e678e'
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
