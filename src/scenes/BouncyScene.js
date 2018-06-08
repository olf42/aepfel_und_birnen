import Phaser from 'phaser'
import Level1 from './bouncyLevels/Level1'
import Level2 from './bouncyLevels/Level2'
import Level3 from './bouncyLevels/Level3'
import Instructions from '../images/Instructions'
import GameScore from '../gui/GameScore'
import ScreenMessages from '../gui/ScreenMessages'

export default class extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'BouncyPearScene',
            physics: {
                arcade: {
                    gravity: { y: 200 },
                    debug: false
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
            Level3,
        ]

    }

    create() {

        this.state = 'play'
        console.log(this.levels)
        let CurrentLevel = this.levels[this.difficulty]
        this.level = new CurrentLevel(this)

        this.level.setup()

        this.level.generateObstacles()

        this.scoreGui = new GameScore(this)
        this.messages = new ScreenMessages(this)

    }

    update(time, delta) {


        this.scoreGui.update(time, delta)

        this.level.update(time, delta)

        if (this.level.state === 'gameover' && this.state == 'play') {
            this.cameras.main.shake(200)
            this.level.player.sprite.destroy()
            setTimeout(() => {
                this.scene.start('ScoreScene')
            }, 500)
            this.state = 'end'
        }
        else if (this.level.state === 'success' && this.state == 'play') {
            this.messages.add(640, 360, "weiter so!", "#ef3483", 100, 2000)
            setTimeout( () => {
                this.difficulty += 1
                if (this.difficulty > 1) {
                    this.scene.start('ScoreScene')
                }
                else {
                    this.scene.restart()
                }
            }, 2000)
            this.state = 'end'
        }
    }
}

