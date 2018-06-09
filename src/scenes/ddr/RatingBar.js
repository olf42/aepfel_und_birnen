import Phaser from 'phaser'

export default class {
    constructor (scene, x, y, currentLevel) {
        this.scene = scene
        this.current = currentLevel

        this.bar = this.scene.add.image(1100, 380, 'ddr_bar')
        this.fill = this.scene.add.graphics()

        
        const xPos = Math.ceil(470 - (currentLevel * 4.7))

        this.fill.fillStyle('0xff0022')
        this.fill.fillRect(1079, 210 + xPos, 46, xPos)
        this.fill.setBlendMode('ADD')

        this.bottomApple = this.scene.add.image(1100,680, this.scene.sys.game.im.random('apples')).setScale(0.3).setDepth(200)
        //this.bottomPear.setTint('0xffdeb9', '0xffdeb9', '0xffdeb9', '0xffdeb9')
        this.topApple = this.scene.add.image(1100, 200, this.scene.sys.game.im.random('apples')).setScale(0.3).setDepth(200)
    }

    updateLevel (currentLevel) {
        this.fill.destroy()
        this.fill = this.scene.add.graphics()

        const xPos = Math.ceil(470 - (currentLevel * 4.7))

        this.fill.fillStyle('0xff0022')
        this.fill.fillRect(1079, 210 + xPos, 46, currentLevel * 4.7)
        this.fill.setBlendMode('ADD')        
    }
}