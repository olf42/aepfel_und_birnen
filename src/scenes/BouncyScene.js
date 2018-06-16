import Phaser from 'phaser'
import Level1 from './bouncyLevels/Level1'
import Level2 from './bouncyLevels/Level2'
import Level3 from './bouncyLevels/Level3'
import LifesDisplay from './bouncyLevels/LifesDisplay'
import { addCloudEmitter } from './bouncyLevels/utils'
import GameScore from '../gui/GameScore'
import ScreenMessages from '../gui/ScreenMessages'
import { congratulations, encouragement } from '../texts/ScreenMessages'
import { sample } from 'lodash'
import { colors } from '../utils'

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
        this.level = new CurrentLevel(this, this.difficulty)
        this.level.setup()
        this.level.generateObstacles()

        // initialize gui elements
        this.scoreGui = new GameScore(this)
        this.messages = new ScreenMessages(this)
        this.lifesDisplay = new LifesDisplay(this, 3-this.fails )

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
            this.messages.add(Phaser.Math.Between(350,700), Phaser.Math.Between(250,450), sample(encouragement), sample(colors), 70, 2000)
            setTimeout( () => {
                this.fails++
                this.lifesDisplay.loseLife()
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
                }, 1500)
            })
            this.state = 'end'
        }
        else if (this.level.state === 'success' && this.state == 'play') {
            // this.sys.game.gc.score += 100
            this.score += 100
            const y = Phaser.Math.Between(250,450)
            this.messages.add(Phaser.Math.Between(350,700), y-100, "+100", sample(colors), 70, 1500)
            setTimeout( () => {
                this.messages.add(Phaser.Math.Between(490,750), y, sample(congratulations), sample(colors), 70, 2000)
            }, 300)
            setTimeout( () => {
                this.difficulty += 1
                if (this.difficulty % 3 === 0) {
                    this.currentLevel += 1
                    this.difficulty = 0
                }
                if (this.currentLevel > 2) {
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

