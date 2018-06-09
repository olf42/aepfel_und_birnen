import Phaser from 'phaser'

export default class {
    constructor (scene, x, y) {
        this.scene = scene
        this.x = x
        this.y = y

        this.obj = this.scene.add.group()

        this.bg = this.obj.create(x, y, 'krug_bg')
        this.bg.setScale(1.0)
        this.bg.setRotation(6)
        this.bg.setDepth(2)

        this.fore = this.obj.create(x, y, 'krug')
        this.fore.setScale(1.0)
        this.fore.setRotation(6)
        this.fore.setDepth(4)
    }

    bounce () {
        this.potTween = this.scene.tweens.add({
            targets: [ this.bg, this.fore ],
            y: 720,
            ease: 'Power4',
            duration: 250,
            yoyo: true,
            repeat: 0
        })        
    }

    hit (player) {
        if (player.sprite.x > this.x-210 && player.sprite.x < this.x+250 && player.sprite.y > this.y) {
            return true
        }   
        return false
    }    
}