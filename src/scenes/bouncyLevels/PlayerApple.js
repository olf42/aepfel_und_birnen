export default class {
    constructor (scene, physics, x, y) {
        this.scene = scene
        this.physics = physics
        this.sprite = this.addAppleImage(x, y)
        this.sprite.setDepth(3)

        this.scene.input.on('pointerup', (event) => {
            const delta = event.upTime - event.downTime 
            if (delta < 200) {
                if (this.physics === 'arcade') {
                    const veloX = this.sprite.body.velocity.x
                    this.sprite.setVelocityX(veloX+20)  
                }
                else {
                    const veloX = this.sprite.body.velocity.x
                    this.sprite.setVelocityX(veloX+1)                  
                }
            }
            else {
                if (this.physics === 'arcade') {
                    this.sprite.setVelocityX(200)
                    this.sprite.setVelocityY(-230)
                }
                else {

                    this.sprite.setVelocityX(200)
                    this.sprite.setVelocityY(-230)
                    
                }               
            }
        })
    }

    addAppleImage (x, y) {
        let apple
        if (this.physics === 'arcade') {
            apple = this .scene.physics.add.image(70, 440, this.scene.sys.game.im.random('apples'))
            //apple.setCollideWorldBounds(true)
            apple.setInteractive()
            apple.setScale(0.35).setBounce(0.3).setCircle(104, 7, 7)
            return apple
        }
        else {
            apple = this.scene.matter.add.image(100, 300, this.scene.sys.game.im.random('apples'))
            apple.setBounce(0.3)
            apple.setBody({
                type: 'circle',
                radius: 80
            })
            apple.setScale(0.5)
            apple.setFrictionAir(0)
            apple.setFriction(0.1)
            apple.setVelocityY(-2)
            return apple
        }
    }

    update (time, delta) {

        if (this.sprite.body) {
            if (this.physics === 'arcade') {
                if (this.sprite.body.velocity.x > 0) {
                    this.sprite.body.velocity.x -= 1
                    this.sprite.rotation += this.sprite.body.velocity.x/2000
                }
                else {
                    this.sprite.body.setVelocityX(0)
                }
            }
        }
    }

    destroy () {
        this.sprite.destroy()
        this.scene.input.off('pointerup')
    }
}