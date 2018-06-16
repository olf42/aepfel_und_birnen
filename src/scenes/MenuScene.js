import Phaser from 'phaser'
import AppleDude from '../images/AppleDude'
import PsychedelicFilter from '../images/PsychedelicFilter'
import { randomColor } from '../utils'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'MenuScene' })
    }


    create () {

        // init filters
        this.psychedelicFilter = new PsychedelicFilter()

        // get game center coordinates
        const centerX = this.sys.game.config.width / 2
        const centerY = this.sys.game.config.height / 2

        this.logo = this.add.image(centerX, centerY-50, 'logo').setAlpha(0)

        this.tweens.add({
            targets: this.logo,
            alpha: 0.8,
            duration: 2000
        })
        this.tweens.add({
            targets: this.logo,
            alpha: 0,
            duration: 1000,
            delay: 6000
        })

        // add apple dude
        this.appleDude = new AppleDude(this, centerX, centerY)
        this.appleDude.fadeIn(2000, 9000)

        // add start game text
        this.time.delayedCall( 3000, () => {
            this.startGameText = this.add.text(centerX, 600, 'Start', {
                font: '56px Ultra',
                fill: '#4e678e'
            }).setAlpha(0)
            this.startGameText.setOrigin(0.5, 0.5).setInteractive()
            this.startGameText.on('pointerup', (event) => {
                this.scene.start('InstructionScene')
            })
            this.tweens.add({
                targets: this.startGameText,
                alpha: 1,
                duration: 2000
            })            
        }, [], this )

        // direct level selection
        this.input.keyboard.on('keydown', (event) => {
            switch (event.key) {
                case "7":
                    this.scene.start('DdrScene')
                    break
                case "8":
                    this.scene.start('SearchScene')
                    break
                case "9":
                    this.scene.start('BouncyPearScene')
                    break
                case "0":
                    this.scene.start('EndScene')
                    break
                case "2":
                    this.scene.stop("ScoreScene")
                    this.scene.stop("DdrScene")
                    this.scene.stop("SearchScene")
                    this.scene.start("CreditsScene")
            }    
        })    

        // credits button
        this.time.delayedCall( 5000, () => {
            this.endText = this.add.text(1000, 680, 'Epilog', {
                font: '24px Bree Serif',
                fill: '#aaa'
            }).setAlpha(0)
            this.endText.setOrigin(0.5, 0.5).setInteractive()
            this.endText.on('pointerup', (event) => {
                this.scene.start('CreditsScene')
            })
            this.tweens.add({
                targets: this.endText,
                alpha: 1,
                duration: 2000
            })               
        })

        // start music
        this.music = this.sys.game.ac.play(this, 'menu')
    }

    update (time, delta) {
        if (this.startGameText)
            this.psychedelicFilter.apply(this.startGameText)
        //this.psychedelicFilter.apply(this.logo)
    }

}
