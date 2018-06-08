import Phaser from 'phaser'

export default class {
    constructor (scene) {
        this.scene = scene
        this.score = this.scene.sys.game.gc.score

        this.scoreObj = this.scene.add.text(1000, 30, this.score, {
            font: '56px Ultra',
            fill: '#4e678e'
        })
        this.scoreObj.setDepth(99)
    }

    update (time, delta) {
        this.scoreObj.setText(this.scene.sys.game.gc.score)
    }
}