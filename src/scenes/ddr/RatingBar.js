import Phaser from 'phaser'

export default class {
    constructor (scene, x, y, currentLevel) {
        this.scene = scene
        this.current = currentLevel

        // add basic graphical element of rating bar
        this.bar = this.scene.add.image(1100, 380, 'ddr_bar')
        this.fill = this.scene.add.graphics()
        
        // set current y position and target
        this.yTarget = Math.ceil(currentLevel * 4.7)
        this.yCurrent = this.yTarget

        // calculate the size of the current bar and fill the bar accordingly
        const xPos = Math.ceil(470 - (currentLevel * 4.7))
        this.fill.fillStyle('0xff0022')
        this.fill.fillRect(1079, 210 + 470, 46, -this.yCurrent)
        this.fill.setBlendMode('ADD')

        // add random apple graphics to hide beginning and end of bar
        this.bottomApple = this.scene.add.image(1100,680, this.scene.sys.game.im.random('apples')).setScale(0.3).setDepth(200)
        this.topApple = this.scene.add.image(1100, 200, this.scene.sys.game.im.random('apples')).setScale(0.3).setDepth(200)

    }

    updateLevel (currentLevel) {
        // set new target
        this.yTarget = Math.ceil(currentLevel * 4.7)
        if (this.yTarget < 0)
            this.yTarget = 0
    }

    update (time, delta) {
        if (this.yTarget != this.yCurrent) {
            if (this.yTarget > this.yCurrent) {
                this.yCurrent += 1
            }
            else {
                this.yCurrent -= 1
            }
  
        }
        // update fill of rating bar
        this.fill.destroy()
        this.fill = this.scene.add.graphics()
        this.fill.fillStyle('0xff0022')
        this.fill.fillRect(1079, 210 + 470, 46, -this.yCurrent)
        this.fill.setBlendMode('ADD')      
    }
}