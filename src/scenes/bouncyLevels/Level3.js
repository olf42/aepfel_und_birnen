import PlayerApple from './PlayerApple'
import Pot from './Pot'
import { randomSpacedValues } from '../../utils'
import { addBouncyObstacle, addStaticObstacle, addTweenObstacle, addPlatform, checkCollision } from './utils'
import { ENGINE_METHOD_DIGESTS } from 'constants';

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
            addPlatform(this.scene, 100, 300),
            addPlatform(this.scene, 1130, 200),
        ]

        this.pot = new Pot(this.scene, 1230, 710)

        // setup player
        this.player = new PlayerApple(this.scene, 100, 0)
    }

    addObstacle () {
    }

    generateObstacles () {
        this.pears = []
        switch (this.difficulty) {
            case 2:
                this.rotation = true
                this.pears[0] = addStaticObstacle(this.scene, 500,600, this.scene.sys.game.im.random('pears'), .6)
                this.pears[1] = addStaticObstacle(this.scene, 700,600, this.scene.sys.game.im.random('pears'), .6)
                this.pears[2] = addStaticObstacle(this.scene, 900,600, this.scene.sys.game.im.random('pears'), .6)
                this.pears[3] = addStaticObstacle(this.scene, 600,350, this.scene.sys.game.im.random('pears'), .6)
                this.pears[4] = addStaticObstacle(this.scene, 800,350, this.scene.sys.game.im.random('pears'), .6)
                this.pears[5] = addStaticObstacle(this.scene, 1000,350, this.scene.sys.game.im.random('pears'), .6)
                this.pears[6] = addStaticObstacle(this.scene, 400,350, this.scene.sys.game.im.random('pears'), .6)
                break
            case 1:
                this.rotation=true
                this.pears[0] =  addTweenObstacle(this.scene, 200, 500, this.scene.sys.game.im.random('pears'), 1, 1200, 0, 1500, 'Linear')
                this.pears[0].setDepth(50)
                break
            case 0:
                this.rotation=true
                this.pears[0] = addStaticObstacle(this.scene, 400,500, this.scene.sys.game.im.random('pears'), 1.5)
                this.pears[1] = addStaticObstacle(this.scene, 850,300, this.scene.sys.game.im.random('pears'), 1.5)
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

        if (this.rotation) {
            for (const pear of this.pears) {
                pear.rotation += .1
            }
        }

        if (this.player.sprite.body) {

            if (this.pot.hit(this.player) && this.state === 'play') {
                this.pot.bounce()
                this.state = 'success'
            }
            else if (this.player.sprite.y > 760  || this.player.sprite.x > 1300) {
                this.state = 'gameover'
            }
        }
    }
}