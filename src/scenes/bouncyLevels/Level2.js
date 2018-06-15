import PlayerApple from './PlayerApple'
import Pot from './Pot'
import { randomSpacedValues } from '../../utils'
import { addBouncyObstacle, addStaticObstacle, addTweenObstacle, addPlatform, checkCollision } from './utils'
import { ENGINE_METHOD_DIGESTS, SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export default class  {
    constructor (scene, difficulty) {
        this.scene = scene
        this.state = 'play'
        this.difficulty = difficulty
    }

    setup () {
        this.background = this.scene.add.image(640, 335, this.scene.sys.game.im.random('korkbg'))
        this.background.setAlpha(0.6)

        this.ground = [
            addPlatform(this.scene, 100, 768-75),
            addPlatform(this.scene, 450, 768-85),
            addPlatform(this.scene, 800, 765-95),
        ]

        this.pot = new Pot(this.scene, 1170, 710)

        // setup player
        this.player = new PlayerApple(this.scene, 100, 300)
    }

    addObstacle () {
    }

    generateObstacles () {
        this.pears = []
        switch (this.difficulty) {
            case 1:
                let y = Phaser.Math.Between(100, 300)
                this.pears[0] = addTweenObstacle(this.scene, 275, y, this.scene.sys.game.im.random('pears'), 0.5, 0, 700, 1200)       
                this.pears[1] = addTweenObstacle(this.scene, 400, 520, this.scene.sys.game.im.random('pears'), 0.5, 1500, 0, 1600, 'Linear').setDepth(30)
                break        
            case 0:
                y = Phaser.Math.Between(100, 300)
                this.pears[0] = addTweenObstacle(this.scene, 275, y, this.scene.sys.game.im.random('pears'), 0.5, 0, 700, 1200)
                y = Phaser.Math.Between(100, 300)
                setTimeout(() => {
                    this.pears[1] = addTweenObstacle(this.scene, 625, y, this.scene.sys.game.im.random('pears'), 0.5, 0, 700, 1200)
                }, Phaser.Math.Between(100, 800))
                break
            case 2:
                this.pears[0] = addStaticObstacle(this.scene, 450, 620, this.scene.sys.game.im.random('pears'), 0.3)
                y = Phaser.Math.Between(100, 300)
                this.pears[1] = addTweenObstacle(this.scene, 625, y, this.scene.sys.game.im.random('pears'), 0.5, 0, 700, 1200)
                break
        }

        this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (checkCollision(bodyA, bodyB, this.player.sprite, this.pears)) {
                this.state = 'gameover'
            }    
        })   

    }


    update (time, delta) {
        this.player.update(time, delta)

        for (const pear of this.pears) {
            pear.rotation += .1
        }

        if (this.player.sprite.body) {

            if (this.pot.hit(this.player) && this.state === 'play') {
                this.pot.bounce()
                this.state = 'success'
            }
            else if (this.player.sprite.y > 760) {
                this.state = 'gameover'
            }
        }
    }
}