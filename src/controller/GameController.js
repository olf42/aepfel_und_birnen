import { shuffle } from 'lodash'

export default class GameController {
    constructor () {

        const scenes = [
            "BouncyPearScene",
            "SearchScene",
            "DdrScene"
        ]

        this.score = 0
        this.scenes = shuffle(scenes)
    }

    nextScene () {
        const scene = this.scenes[0]
        this.scenes.shift()
        return scene
    }
}