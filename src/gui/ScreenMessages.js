import Phaser from 'phaser'

export default class {
    constructor(scene) {
        this.scene = scene
        this.queue = []
    }

    add (x, y, text, color, size, duration) {
        let msg = this.scene.add.text(x, y, text, {
            font: size+'px Ultra',
            fill: color
        }).setDepth(50)
        this.queue.push({
            obj: msg,
            duration: duration
        })
    }

    update (time, delta) {
        for (let message of this.queue) {
            message.duration -= delta
            message.obj.alpha -= delta/1000

            if (message.duration <= 0) {
                message.obj.destroy()
            }
        }
        this.queue = this.queue.filter(msg  => msg.duration > 0)
    }
}