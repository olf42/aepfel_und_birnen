import PlayerApple from './PlayerApple'
import Pot from './Pot'
import { randomSpacedValues } from '../../utils'

export default class  {
    constructor (scene) {
        this.scene = scene
        this.state = 'play'
    }

    setup () {
        this.background = this.scene.add.image(640, 335, this.scene.sys.game.im.random('korkbg'))
        this.background.setAlpha(0.6)

        this.ground1 = this.scene.physics.add.staticImage(100, 768 - 75, 'ground_s')
        this.ground2 = this.scene.physics.add.staticImage(500, 768 - 75, 'ground_s')
        this.ground3 = this.scene.physics.add.staticImage(900, 768 - 75, 'ground_s')

        this.pot = new Pot(this.scene, 1170, 710)

        // setup player
        this.player = new PlayerApple(this.scene, 'arcade', 200, 300)
        this.scene.physics.add.collider(this.ground1, this.player.sprite)
        this.scene.physics.add.collider(this.ground2, this.player.sprite)
        this.scene.physics.add.collider(this.ground3, this.player.sprite)
    }

    addObstacle () {
    }

    generateObstacles () {
        // generate obstacles
        this.pearGroup = this.scene.physics.add.group({
            bounceX: 0,
            bounceY: 1,
            collideWorldBounds: true
        })
        this.pears = []
        const xPositions = [300, 700]
        xPositions.forEach((x, i) => {
            const y = Phaser.Math.Between(100,300)
            const veloY = Phaser.Math.Between(200,300)
            const scale = Phaser.Math.FloatBetween(0.3, 0.6)
            this.pears[i] = this.pearGroup.create(x, y, this.scene.sys.game.im.random('pears'))
            this.pears[i].setVelocityY(veloY).setScale(scale)
            this.pears[i].setRotation(Phaser.Math.Between(0, 360))
            this.pears[i].setCircle(80, 15, 20)
        })

        // add colliders
        this.scene.physics.add.collider(this.ground1, this.pearGroup)
        this.scene.physics.add.collider(this.player.sprite, this.pearGroup, () => {
            this.state = 'gameover'
        })

    }


    update (time, delta) {
        this.player.update(time, delta)

        if (this.player.sprite.x > 1000 && this.player.sprite.y > 710 && this.state === 'play') {
            this.pot.bounce()
            this.state = 'success'
        }
    }
}