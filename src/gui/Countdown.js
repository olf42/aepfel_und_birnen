export default class {
    constructor (scene, duration) {
        this.scene = scene
        this.duration = duration

        this.running = true

        this.text = this.scene.add.text(640, 30, this.duration, {
            font: '56px Ultra',
            fill: '#4e678e'
        })
    }

    update (delta) {
        if (this.running === true) {
            this.duration -= delta / 1000
            this.text.setText(Math.ceil(this.duration))
        }
    }
}
