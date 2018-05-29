import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'EndScene' })
    }

    create () {
        let text = this.add.text(100, 250, "This is the end of the game.", {
            font: '56px Ultra',
            fill: '#4e678e'
        })        
    }
}