export default class {
    constructor (scene, physics, x, y) {
        this.scene = scene
        this.physics = physics
        this.sprite = this.addAppleImage(x, y)
    }

    addAppleImage (x, y) {
        let apple
        if (this.physics === 'arcade') {
            apple = this .scene.physics.add.image(70, 440, this.scene.sys.game.im.random('apples'))
            apple.setCollideWorldBounds(true)
            apple.setInteractive()
            apple.setScale(0.35).setBounce(0.3).setCircle(104, 7, 7)
            return apple
        }
        else {
        // set up player
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
            // // controlling
            // this.input.on('pointerup', (event) => {
            //     const velX = this.apple.body.velocity.x
            //     this.apple.setVelocityX(velX + 0.6)
            // })

            // // collision event
            // this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            //     if (bodyA === this.apple.body || bodyB === this.apple.body)
            //         if (bodyA === this.level.pear.body || bodyB === this.level.pear.body)
            //             this.scene.restart()
            // })
        }
    }

}