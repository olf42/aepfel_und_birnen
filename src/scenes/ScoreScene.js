import Phaser from 'phaser'
import { randomColor } from '../utils'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'ScoreScene' })
    }

    create () {
        const level = this.sys.game.gc.level - 1
        const quote = this.sys.game.gc.story[level]

        // add quote + frame
        this.frame = this.add.image(810,250, 'frame02').setScale(1).setAlpha(0)
        this.quote = this.add.text(520, 130, quote, {
            font: '24px Bree Serif',
            fill: '#888888'
        }).setAlpha(0)
        this.tweens.add({
            targets: [ this.frame, this.quote ],
            alpha: 1,
            ease: 'Linear',
            duration: 2000,
        })

        
        this.dude = this.add.image(250, 400, 'scoreDude')

        this.score = this.add.text(680, 500, this.sys.game.gc.getLastScore()+' Punkte', {
            font: '48px Ultra',
            fill: '#888'
        })
        this.score.setOrigin(0,0)

        // botton for next scene
        this.next = this.add.text(970, 620, 'Weiter', {
            font: '36px Ultra',
            fill: '#4e678e'
        })
        this.next.setOrigin(0,0)
        this.next.setInteractive()
        this.next.on('pointerup', () => {
            this.scene.start(this.sys.game.gc.nextScene())
        })
    }
}
