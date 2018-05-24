export default class {
    constructor (scene, duration) {
        this.scene = scene
        this.duration = duration

        this.text = this.scene.add.text(512, 30, this.duration, {
            font: '56px Ultra',
            fill: '#4e678e'
        })
    }

    update (delta) {
        this.duration -= delta / 1000
        this.text.setText(Math.ceil(this.duration))
    }
}