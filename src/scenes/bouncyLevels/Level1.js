import PlayerApple from './PlayerApple'
import Pot from './Pot'
import { randomSpacedValues } from '../../utils'

export default class  {
    constructor (scene) {
        this.scene = scene
        this.state = 'play'
    }

    setup () {
        this.background = this.scene.add.image(580, 335, 'tempel')
        this.background.setAlpha(0.6)
        this.ground = this.scene.physics.add.staticImage(512, 768 - 75, 'ground1')

        // setup player
        this.player = new PlayerApple(this.scene, 'arcade', 200, 300)
        this.scene.physics.add.collider(this.ground, this.player.sprite)

        this.pot = new Pot(this.scene, 1170, 710)        
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
        const xPositions = randomSpacedValues(200, 850, 3, 150)
        xPositions.forEach((x, i) => {
            const y = Phaser.Math.Between(100,300)
            const veloY = Phaser.Math.Between(200,400)
            const scale = Phaser.Math.FloatBetween(0.3, 0.6)
            this.pears[i] = this.pearGroup.create(x, y, this.scene.sys.game.im.random('pears'))
            this.pears[i].setVelocityY(veloY).setScale(scale)
            this.pears[i].setRotation(Phaser.Math.Between(0, 360))
            this.pears[i].setCircle(80, 15, 20)
        })

        // add colliders
        this.scene.physics.add.collider(this.ground, this.pearGroup)
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