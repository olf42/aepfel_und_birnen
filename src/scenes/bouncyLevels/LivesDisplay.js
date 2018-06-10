export default class {
    constructor (scene, lives, color='#4e678e', x=100, y=30) {
        this.scene = scene
        this.color = color
        this.lives = lives
        this.apple = this.scene.sys.game.im.random('apples')

        this.pt = this.scene.add.text(x, y-10, "Leben", {
            font: '16px Bree Serif',
            fill: this.color
        })
        this.pt.setDepth(99)
        
        this.liveObjs = []

        for (let i = 0; i < lives; i++) {
            this.liveObjs[i] = this.scene.add.image(x + 20 + (i * 30), y+33,  this.apple)
            this.liveObjs[i].setScale(0.2).setDepth(99)
        }
    }

    lostLive () {
        this.liveObjs[this.liveObjs.length-1].destroy()
        this.liveObjs.pop()
    }
}