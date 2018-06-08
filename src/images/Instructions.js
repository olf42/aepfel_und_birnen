import Phaser from 'phaser'

export default class Instructions {
    constructor(scene, x, y) {
        this.state = 'pause'
        this.scene = scene
        this.x = x
        this.y = y


        this.frame = this.scene.add.image(x, y, 'frame')
        this.frame.setScale(0.7)
        this.frame.setDepth(100)

        this.heading = this.scene.add.text(x-250, y-250, 'Hier Überschrift', {
            font: '50px Ultra',
            fill: '#fff'
        })
        this.heading.setDepth(101)

        this.goalText = this.scene.add.text(250, 200, 'Ziel:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.goalText.setDepth(101)

        this.controlText = this.scene.add.text(250, 350, 'Steuerung:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.controlText.setDepth(101)

        this.ratingText = this.scene.add.text(250, 500, 'Wertung:', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.ratingText.setDepth(101)

        this.startGame = this.scene.add.text(950, 550, 'Start', {
            font: '24px Ultra',
            fill: '#fff'
        })
        this.startGame.setDepth(101)
        
        this.startGame.setOrigin(0.5, 0.5).setInteractive()
        this.startGame.on('pointerup', (event) => {
            console.log('start')
            this.scene.wake()
        })
    }

    destory () {
        this.frame.destroy()
        this.heading.destroy()
        this.goalText.destroy()
        this.controlText.destroy()
        this.ratingText.destroy()
        this.startGame.destroy()
    }
    
}