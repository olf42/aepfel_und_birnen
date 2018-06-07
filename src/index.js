import Phaser from 'phaser'

import GameController from './controller/GameController'
import ImageManager from './images/ImageManager'

import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'
import ScoreScene from './scenes/ScoreScene'
import EndScene from './scenes/EndScene'

// Minigame scenes
import BouncyScene from './scenes/BouncyScene'
//import BouncyPearScene from './scenes/BouncyPearScene'
import DdrScene from './scenes/DdrScene'
import SearchScene from './scenes/SearchScene'
import InstructionScene from './scenes/InstructionScene'

var config = {
    type: Phaser.AUTO,
    width:1280,
    height: 720,
    backgroundColor: 0xffdeb9,
    physics: {
        //default: 'matter',
        arcade: {
            gravity: { y: 200 },
            debug: true
        },
        matter: {
            debug: true,
            gravity: { y: 0.5}
        }
    },
    scene: [
        BootScene,
        MenuScene,
        ScoreScene,
        BouncyScene,
        DdrScene,
        SearchScene,
        EndScene,
        InstructionScene
    ]
}

class Game extends Phaser.Game {
    constructor(config) {
        super(config)
        this.im = new ImageManager()
        this.gc = new GameController()
    }
}

// window.game = new Phaser.Game(config)
window.game = new Game(config)