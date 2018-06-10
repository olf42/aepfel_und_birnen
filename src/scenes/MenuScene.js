import Phaser from 'phaser'
import StickDude from '../images/StickDude'
import Silhouette from '../images/Silhouette'
import PsychedelicFilter from '../images/PsychedelicFilter'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'MenuScene' })
    }

    create () {

        // init filters
        this.psychedelicFilter = new PsychedelicFilter()

        // stuff for color tinting
        this.hsv = Phaser.Display.Color.HSVColorWheel()
        this.tintCounter = 0

        // get game center coordinates
        const centerX = this.sys.game.config.width / 2
        const centerY = this.sys.game.config.height / 2

        // add dude with apple
        let y = Phaser.Math.Between(80,350)
        let veloY = Phaser.Math.Between(80, 400)

        this.dude = this.add.image(centerX, centerY, 'appleDude')
        this.arm = this.add.image(677+129, 424-25, 'appleDudeArm')
        this.arm.setOrigin(1, 0.5)

        this.apple = this.add.image(589+129, 424-25, 'appleDudeApple')

        this.appleTween = this.tweens.add({
            targets: this.apple,
            y: 300,
            ease: 'Power1',
            duration: 500,
            yoyo: true,
            repeat: -1,
            repeatDelay: 200
        })

        this.armTween = this.tweens.add({
            targets: this.arm,
            rotation: 0.2,
            ease: 'Power1',
            duration: 500,
            yoyo: true,
            repeat: -1,
            repeatDelay: 200
        })

        // add start game text
        this.startGameText = this.add.text(centerX, 600, 'Spiel starten', {
            font: '56px Ultra',
            fill: '#4e678e'
        })

        this.startGameText.setOrigin(0.5, 0.5).setInteractive()
        // add event handling to text
        this.startGameText.on('pointerover', (event) => {
            this.startGameText.setShadow(2, 2, '#000000', false, true)
        })
        this.startGameText.on('pointerout', (event) => {
            this.startGameText.setShadow(0, 0, '#000000', false, false)
        })
        this.startGameText.on('pointerup', (event) => {
            this.sys.game.ac.randomSound(this)
            this.scene.start('InstructionScene')
        })

        this.DdrSceneText = this.add.text(900, 200, 'Herobst', {
            font: '24px Ultra',
            fill: '#4e678e'
        })
        this.DdrSceneText.setOrigin(0.5, 0.5).setInteractive()
        this.DdrSceneText.on('pointerup', (event) => {
            this.scene.start('DdrScene')
        })

        this.searchSceneText = this.add.text(900, 300, 'Sucher', {
            font: '24px Ultra',
            fill: '#4e678e'
        })
        this.searchSceneText.setOrigin(0.5, 0.5).setInteractive()
        this.searchSceneText.on('pointerup', (event) => {
            this.scene.start('SearchScene')
        })

        this.bouncySceneText = this.add.text(900, 400, 'Springer', {
            font: '24px Ultra',
            fill: '#4e678e'
        })
        this.bouncySceneText.setOrigin(0.5, 0.5).setInteractive()
        this.bouncySceneText.on('pointerup', (event) => {
            this.scene.start('BouncyPearScene')
        })

        //music
        this.music = this.sys.game.ac.play(this, 'menu')
    }

    update (time, delta) {

        // // color tint text
        // const top =  this.hsv[Math.floor(this.tintCounter)].color
        // const bottom = this.hsv[359 - Math.floor(this.tintCounter)].color
        // this.startGameText.setTint(top, bottom, bottom, top)
        // this.tintCounter += 2;
        // if (this.tintCounter >= this.hsv.length)
        //     this.tintCounter = 0;
        this.psychedelicFilter.apply(this.startGameText)

    }

}
