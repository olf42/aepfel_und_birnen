import Phaser from 'phaser'
import Level1 from './bouncyLevels/Level1'
import Level2 from './bouncyLevels/Level2'

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

        this.level = 0
        this.levels = [
            Level1,
            Level2
        ]
    }

    create() {
        const CurrentLevel = this.levels[this.level]
        this.level = new CurrentLevel(this)

        this.level.setup()

        this.level.generateObstacles()

    }

    update(time, delta) {
        this.level.update(time, delta)

    }
}

