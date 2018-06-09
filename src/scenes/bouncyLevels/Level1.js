import PlayerApple from './PlayerApple'
import Pot from './Pot'
import { randomSpacedValues } from '../../utils'
import { addBouncyObstacle, addStaticObstacle, addPlatform, checkCollision } from './utils'

export default class  {
    constructor (scene, difficulty) {
        this.scene = scene
        this.state = 'play'
        this.difficulty = difficulty

    }

    setup () {
        this.background = this.scene.add.image(580, 335, 'tempel')
        this.background.setAlpha(0.6)
        
        this.ground = this.scene.matter.add.image(512, 768-75, 'ground1', null, { isStatic: true, })
        this.ground.setFriction(0)

        this.player = new PlayerApple(this.scene, 'matter', 200, 300)

        this.pot = new Pot(this.scene, 1170, 710)        
    }


    generateObstacles () {
        this.pears = []
        switch (this.difficulty) {
            case 0:
                this.pears[0] = addBouncyObstacle(this.scene, 700, 200, this.scene.sys.game.im.random('pears'), 1, 0, 0)
                break
            
            case 1:
                let xPositions = randomSpacedValues(200, 850, 2, 150)
                xPositions.forEach((x, i) => {
                    const y = Phaser.Math.Between(100,300)
                    const scale = Phaser.Math.FloatBetween(0.4, 0.7)

                    this.pears[i] = addBouncyObstacle(this.scene, x, y, this.scene.sys.game.im.random('pears'), scale, 0, 2)
                })
                this.pears[this.pears.length] = addStaticObstacle(this.scene, 850, 620, this.scene.sys.game.im.random('pears'), 0.5)
                break
            
            case 2:
                xPositions = randomSpacedValues(200, 850, 3, 150)
                xPositions.forEach((x, i) => {
                    const y = Phaser.Math.Between(100,300)
                    const scale = Phaser.Math.FloatBetween(0.3, 0.6)
                    this.pears[i] = addBouncyObstacle(this.scene, x, y, this.scene.sys.game.im.random('pears'), scale, 0, 3)
                })
                break                
        }

        this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {

            if (checkCollision(bodyA, bodyB, this.player.sprite, this.pears)) {
                this.state = 'gameover'
            }
            // if (bodyA === this.player.sprite.body || bodyB === this.player.sprite.body) {
            //     for (const pear of this.pears) {
            //         if (pear.body) {
            //             if (bodyA === pear.body || bodyB === pear.body) {
            //                 this.state = 'gameover'
            //             }
            //         }
            //     }
            // }
    
        })        
    }

    update (time, delta) {
        this.player.update(time, delta)
        if (this.player.sprite.body) {
            // if (this.player.sprite.x > this.pot.x-250 && this.player.sprite.x < this.pot.x+250 && this.player.sprite.y > this.pot.y && this.state === 'play') {
            if (this.pot.hit(this.player) && this.state === 'play') {
                this.pot.bounce()
                this.state = 'success'
            }        
        }
    }
}