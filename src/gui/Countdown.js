export default class {
    constructor (scene, duration, color='#4e678e', x=640, y=30) {
        this.scene = scene
        this.duration = duration
        this.color = color
        this.running = true

        this.timeText = this.scene.add.text(x, y-10, "Zeit", {
            font: '16px Bree Serif',
            fill: this.color
        })
        this.timeText.setDepth(99)

        this.text = this.scene.add.text(x, y, this.duration, {
            font: '56px Ultra',
            fill: this.color
        })
        this.text.setDepth(99)
    }

    update (delta) {
        if (this.running === true) {
            this.duration -= delta / 1000
            this.text.setText(Math.ceil(this.duration))
        }
    }
}
