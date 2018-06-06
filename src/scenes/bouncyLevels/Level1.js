import PlayerApple from './PlayerApple'

export default class  {
    constructor (scene) {
        this.scene = scene
        this.status = 'init'
    }

    setup () {
        this.background = this.scene.add.image(580, 335, 'tempel')
        this.background.setAlpha(0.6)
        this.ground = this.scene.physics.add.staticImage(512, 768 - 75, 'ground1')

        // setup player
        this.player = new PlayerApple(this.scene, 'arcade', 200, 300)
        this.scene.physics.add.collider(this.ground, this.player.sprite)
    }

    addObstacle () {
    }

    generateObstacles () {
    }

    update (time, delta) {
    }
}