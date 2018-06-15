export default class {
    constructor (scene, x, y) {
        this.scene = scene
        this.sprite = this.addAppleImage(x, y)
        this.sprite.setDepth(35)

        this.scene.input.on('pointerup', (event) => {
            const delta = event.upTime - event.downTime 
            if (delta < 200) {
                const veloX = this.sprite.body.velocity.x
                this.sprite.setVelocityX(veloX+0.7)                  
            }
            else {
                this.sprite.setVelocityX(5)
                this.sprite.setVelocityY(-5)                   
            }
        })
    }

    addAppleImage (x, y) {
        let apple = this.scene.matter.add.image(x, y, this.scene.sys.game.im.random('apples'))

        apple.setBody({
            type: 'circle',
            radius: 100,
            density: 0
        })
        apple.setBounce(0.3)
        apple.setScale(0.3)
        apple.setFrictionAir(0.02)
        apple.setFriction(0.0)
        return apple

    }

    update (time, delta) {

        if (this.sprite.body) {
            if (this.sprite.body.velocity.x > 0.01) {
                this.sprite.rotation += this.sprite.body.velocity.x*100/1500
            }
        }
    }

    destroy () {
        this.sprite.destroy()
        this.scene.input.off('pointerup')
    }

}