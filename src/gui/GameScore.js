import Phaser from 'phaser'

export default class {
    constructor (scene, color='#4e678e', x=1000, y=30) {
        this.scene = scene
        this.score = this.scene.sys.game.gc.score
        this.color = color

        //this.frame = this.scene.add.image(x, y, 'frame').setScale(0.1).setDepth(98).set

        this.pt = this.scene.add.text(x, y-10, "Punkte", {
            font: '16px Bree Serif',
            fill: this.color
        })
        this.pt.setDepth(99)

        this.scoreObj = this.scene.add.text(x, y, this.score, {
            font: '56px Ultra',
            fill: this.color
        })
        this.scoreObj.setDepth(99)
    }

    update (time, delta) {
        this.scoreObj.setText(this.scene.sys.game.gc.score)
    }
}