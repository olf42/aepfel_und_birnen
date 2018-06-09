import Phaser from 'phaser'
import Level1 from './bouncyLevels/Level1'
import Level2 from './bouncyLevels/Level2'
import Level3 from './bouncyLevels/Level3'
import GameScore from '../gui/GameScore'
import ScreenMessages from '../gui/ScreenMessages'

export default class extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'BouncyPearScene',
            physics: {
                matter: {
                    debug: true
                }
            }   
        })

        this.fails = 0
        this.difficulty = 0
        this.currentLevel = 0
        this.levels = [
            Level1,
            Level2,
            Level3,
        ]

    }

    create() {
        //this.matter.world.setBounds()
        
        this.state = 'play'
        console.log(this.levels)
        let CurrentLevel = this.levels[this.currentLevel]
        this.level = new CurrentLevel(this, this.difficulty - (this.currentLevel*2) )

        this.level.setup()

        this.level.generateObstacles()

        this.scoreGui = new GameScore(this)
        this.messages = new ScreenMessages(this)

    }

    update(time, delta) {


        this.scoreGui.update(time, delta)
        this.messages.update(time, delta)

        this.level.update(time, delta)

        if (this.level.state === 'gameover' && this.state == 'play') {
            this.messages.add(640, 360, ":-(", "#ef3483", 100, 500)
            setTimeout( () => {
                this.fails++
                this.cameras.main.shake(200)
                this.level.player.destroy()
                setTimeout(() => {
                    if (this.fails > 2) {
                        this.scene.start('ScoreScene')
                    }
                    else {
                        this.scene.restart()
                    }
                }, 1000)
            })
            this.state = 'end'
        }
        else if (this.level.state === 'success' && this.state == 'play') {
            this.sys.game.gc.score += 100
            this.messages.add(540, 260, "+100", "#ef3483", 100, 1500)
            setTimeout( () => {
                this.messages.add(640, 360, "weiter so!", "#ef3483", 100, 1500)
            }, 300)
            setTimeout( () => {
                this.difficulty += 1
                if (this.difficulty % 3 === 0) {
                    this.currentLevel += 1
                }
                if (this.currentLevel > 1) {
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

