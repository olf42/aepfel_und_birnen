import Phaser from 'phaser'
import Level1 from './bouncyLevels/Level1'
import Level2 from './bouncyLevels/Level2'
import Level3 from './bouncyLevels/Level3'
import GameScore from '../gui/GameScore'

export default class extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'BouncyPearScene',
            physics: {
                arcade: {
                    gravity: { y: 200 },
                    debug: true
                },
                matter: {
                    debug: true,
                    gravity: { y: 0.5}
                }
            }   
        })

        this.difficulty = 1
        this.levels = [
            Level1,
            Level2,
            Level3
        ]
    }

    create() {
        const CurrentLevel = this.levels[this.difficulty]
        this.level = new CurrentLevel(this)

        this.level.setup()

        this.level.generateObstacles()

        this.scoreGui = new GameScore(this)
    }

    update(time, delta) {

        this.scoreGui.update(time, delta)

        this.level.update(time, delta)

        if (this.level.state === 'gameover') {
            this.cameras.main.shake(200)
            this.level.player.sprite.destroy()
            setTimeout(() => {
                this.scene.start('ScoreScene')
            }, 500)
            
        }
    }
}

