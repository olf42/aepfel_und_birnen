import PlayerApple from './PlayerApple'

export default class  {
    constructor (scene) {
        this.scene = scene
        this.status = 'init'
    }

    setup () {
        this.background = this.scene.add.image(640, 335, 'bg2')
        this.ground = this.scene.matter.add.image(640, 768 - 75, 'ground2', null, { isStatic: true })
        this.ground.setAngle(-2.5)

        //setup player
        this.player = new PlayerApple(this.scene, 'matter', 200, 200)
    }

    addObstacle () {
        // set up obstacles
        const pear = this.scene.matter.add.image(1100, 80, 'pear05')

        pear.setBody({
            type: 'circle',
            radius: 90
        })
        pear.setScale(0.8)
        pear.setVelocityX(-2)
        pear.setFrictionAir(0)
        pear.setFriction(0.0)
        pear.setBounce(1)        

        this.pears.push(pear)
    }

    generateObstacles () {
        this.pears = []
        this.addObstacle()
        setTimeout( () => {
            this.addObstacle()
        }, 3000 )

        this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {

            if (bodyA === this.player.sprite.body || bodyB === this.player.sprite.body) {
                for (const pear of this.pears) {
                    if (pear.body) {
                        if (bodyA === pear.body || bodyB === pear.body) {
                            this.state = 'gameover'
                        }
                    }
                }
            }
    
        })
    }

    update (time, delta) {
        for (const pear of this.pears) {
            if (pear.x < 0) {
                pear.destroy() 
                this.pears.shift()
                this.addObstacle()   
            }
        }
    }
}
