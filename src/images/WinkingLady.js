import Phaser from 'phaser'

export default class WinkingLady {
    constructor(scene, x, y) {
        this.scene = scene
        this.x = x
        this.y = y

        this.lady = this.scene.add.image(x, y, 'winkingLady')
        this.lid = this.scene.add.image(x+28, y-51, 'winkingLadyLid')
        this.lady.setScale(0.4)
        this.lid.setScale(0.4)
        this.lid.visible = false
    }

    wink() {
        this.lid.visible = true
        setTimeout(() => {
            this.lid.visible = false
        }, 50)
    }
}