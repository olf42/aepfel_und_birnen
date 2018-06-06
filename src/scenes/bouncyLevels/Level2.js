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
        pear.setVelocityX(0)
        pear.setFrictionAir(0)
        pear.setFriction(0.0)
        pear.setBounce(1)        

        return pear
    }

    generateObstacles () {
        this.pear = this.addObstacle()
    }

    update (time, delta) {

        if (this.pear.x < 0) {
            this.pear.destroy()
            this.pear = this.addObstacle()    
        }
    }
}