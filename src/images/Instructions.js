import Phaser from 'phaser'

export default class Instructions {
    constructor(scene, x, y) {
        this.scene = scene
        this.x = x
        this.y = y

        this.frame = this.scene.add.image(x, y, 'frame')
        this.frame.setScale(0.7)

        this.heading = this.scene.add.text(x-250, y-250, 'Hier Überschrift', {
            font: '50px Ultra',
            fill: '#fff'
        })

        this.goalText = this.scene.add.text(250, 200, 'Ziel:', {
            font: '24px Ultra',
            fill: '#fff'
        })

        this.controlText = this.scene.add.text(250, 350, 'Steuerung:', {
            font: '24px Ultra',
            fill: '#fff'
        })

        this.ratingText = this.scene.add.text(250, 500, 'Wertung:', {
            font: '24px Ultra',
            fill: '#fff'
        })

        this.startGame = this.scene.add.text(950, 550, 'Start', {
            font: '24px Ultra',
            fill: '#fff'
        })
        
        this.startGame.setOrigin(0.5, 0.5).setInteractive()
    }
    
}