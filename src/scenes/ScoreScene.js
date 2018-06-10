import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'ScoreScene' })
    }

    create () {
        const level = this.sys.game.gc.level - 1
        const quote = this.sys.game.gc.story[level]

        this.frame = this.add.image(810,250, 'frame02').setScale(1)

        this.dude = this.add.image(250, 400, 'scoreDude')



        this.quote = this.add.text(520, 130, '"'+quote+'"', {
            font: '24px Bree Serif',
            fill: '#888888'
        })

        this.score = this.add.text(470, 550, this.sys.game.gc.score+' Punkte', {
            font: '48px Ultra',
            fill: '#4e678e'
        })
        this.score.setOrigin(0,0)

        this.next = this.add.text(870, 550, 'Weiter', {
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
