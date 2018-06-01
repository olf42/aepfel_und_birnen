import { shuffle } from 'lodash'

export default class GameController {
    constructor () {

        this.gameList = [
            "BouncyPearScene",
            "SearchScene",
            "DdrScene"
        ]

        this.score = 0
        this.scenes = shuffle(this.gameList)
    }

    nextScene () {
        if (this.scenes.length > 0) {
            const scene = this.scenes[0]
            this.scenes.shift()
            return scene
        }
        else {
            return 'EndScene'
        }
    }
}