import Phaser from 'phaser'
import Level1 from './bouncyLevels/Level1'
import Level2 from './bouncyLevels/Level2'
import Level3 from './bouncyLevels/Level3'
import LivesDisplay from './bouncyLevels/LivesDisplay'
import GameScore from '../gui/GameScore'
import ScreenMessages from '../gui/ScreenMessages'
import { addCloudEmitter } from './bouncyLevels/utils'

export default class extends Phaser.Scene {
    constructor() {
        super({ 
            key: 'BouncyPearScene',
            physics: {
                matter: {
                    debug: false
                }
            }   
        })
        this.score = 0
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
        // scene state
        this.state = 'play'
        
        // initialize level
        let CurrentLevel = this.levels[this.currentLevel]
        this.level = new CurrentLevel(this, this.difficulty - (this.currentLevel*2) )
        this.level.setup()
        this.level.generateObstacles()

        // initialize gui elements
        this.scoreGui = new GameScore(this)
        this.messages = new ScreenMessages(this)
        this.livesDisplay = new LivesDisplay(this, 3-this.fails )

        this.cloudEmitter = addCloudEmitter(this)
    }

    update(time, delta) {

        // update gui elements
        this.scoreGui.update(time, delta)
        this.messages.update(time, delta)

        // update level
        this.level.update(time, delta)

        // check gameover and level success conditions
        if (this.level.state === 'gameover' && this.state == 'play') {
            this.messages.add(640, 360, ":-(", "#ef3483", 100, 500)
            setTimeout( () => {
                this.fails++
                this.livesDisplay.lostLive()
                this.cameras.main.shake(200)
                this.level.player.destroy()
                setTimeout(() => {
                    if (this.fails > 2) {
                        this.sys.game.gc.addScore('Der Sprung', this.score)
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
            // this.sys.game.gc.score += 100
            this.score += 100
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
                    this.sys.game.gc.addScore('Der Sprung', this.score)
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

