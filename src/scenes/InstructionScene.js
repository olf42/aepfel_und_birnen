import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super( { key: 'InstructionScene' })
    }

    create () {
        const x = 640
        const y = 360
        const sceneConfig = this.sys.game.gc.currentScene()
        const level = this.sys.game.gc.level

        this.frame = this.add.image(x, y, 'frame')
        this.frame.setScale(0.7)
        this.frame.setDepth(100)

        this.heading = this.add.text(x-250, y-250, 'Kapitel '+level+": "+sceneConfig.title, {
            font: '40px Ultra',
            fill: '#fff'
        })
        this.heading.setDepth(101)

        this.goalText = this.add.text(250, 200, 'Ziel:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.goalText.setDepth(101)

        this.controlText = this.add.text(250, 350, 'Steuerung:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.controlText.setDepth(101)

        this.ratingText = this.add.text(250, 500, 'Wertung:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.ratingText.setDepth(101)

        this.startGame = this.add.text(950, 550, 'Start', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.startGame.setDepth(101)
        
        this.startGame.setOrigin(0.5, 0.5).setInteractive()
        this.startGame.on('pointerup', (event) => {
            this.scene.start(sceneConfig.key)
        })        
    }
}