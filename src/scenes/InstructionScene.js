import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super( { key: 'InstructionScene' })
    }

    create () {
        
        const x = 640
        const y = 360

        // next level information and random facts
        const sceneConfig = this.sys.game.gc.currentScene()
        const level = this.sys.game.gc.level
        const fact = this.sys.game.gc.randomFact()

        this.frame = this.add.image(x, y, 'frame01')
        this.frame.setScale(0.7)
        this.frame.setDepth(100)

        this.heading = this.add.text(x-250, y-230, 'Kapitel '+level+": "+sceneConfig.title, {
            font: '40px Ultra',
            fill: '#fff'
        })
        this.heading.setDepth(101)

        this.controlHeader = this.add.text(250, 250, 'Anweisung:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.controlHeader.setDepth(101)
        
        this.controlText = this.add.text(250, 300, sceneConfig.control, {
            font: '24px Bree Serif',
            fill: '#eee'
        })
        this.controlText.setDepth(101)

        this.factHeader = this.add.text(250, 400, 'Fact:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.factHeader.setDepth(101)

        this.factText = this.add.text(250, 450, fact, {
            font: '24px Bree Serif',
            fill: '#eee'
        })
        this.factText.setDepth(101)

        this.startGame = this.add.text(950, 570, 'Start', {
            font: '36px Ultra',
            fill: '#fff'
        })
        this.startGame.setDepth(101)
        
        this.startGame.setOrigin(0.5, 0.5).setInteractive()
        this.startGame.on('pointerup', (event) => {
            this.scene.start(sceneConfig.key)
        })    

        // (re) start music
        this.music = this.sys.game.ac.play(this, 'menu')            
    }
}