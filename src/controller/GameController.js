
import { shuffle } from 'lodash'

export default class GameController {
    constructor () {

        this.games = [
            {
                key: 'BouncyPearScene',
                title: 'Der Sprung',
                text: "bla"
            },
            {
                key: 'SearchScene',
                title: 'Die Suche',
                text: "bla"
            },
            {
                key: 'DdrScene',
                title: 'Der Tanz',
                text: "bla"
            }                        
        ]

        this.gameList = [
            "BouncyPearScene",
            "SearchScene",
            "DdrScene"
        ]

        this.score = 0
        this.level = 1
        this.scenes = shuffle(this.games)
    }

    currentScene () {
        return this.scenes[0]
    }

    nextScene () {
        if (this.scenes.length > 0) {
            this.level += 1
            const scene = this.scenes[0]
            this.scenes.shift()
            return 'InstructionScene'
        }
        else {
            return 'EndScene'
        }
    }
}