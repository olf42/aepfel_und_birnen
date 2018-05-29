import Phaser from 'phaser'

export default class WinkingLady {
    constructor(scene, x, y) {
        this.scene = scene
        this.x = x
        this.y = y

        this.lady = this.scene.add.image(x, y, 'winkingLady')
        this.lid = this.scene.add.image(x+34, y-63, 'winkingLadyLid')
        this.lady.setScale(0.5)
        this.lid.setScale(0.5)
        this.lid.visible = false
    }

    wink() {
        this.lid.visible = true
        setTimeout(() => {
            this.lid.visible = false
        }, 50)
    }
}