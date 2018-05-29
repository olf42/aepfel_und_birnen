import Phaser from 'phaser'

import GameController from './controller/GameController'
import ImageManager from './images/ImageManager'

import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'
import ScoreScene from './scenes/ScoreScene'
import EndScene from './scenes/EndScene'

// Minigame scenes
import BouncyPearScene from './scenes/BouncyPearScene'
import DdrScene from './scenes/DdrScene'
import SearchScene from './scenes/SearchScene'

var config = {
    type: Phaser.AUTO,
    width:1280,
    height: 720,
    backgroundColor: 0xffdeb9,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y : 300 
            },
            debug: false
        }
    },
    scene: [
        BootScene,
        MenuScene,
        ScoreScene,
        BouncyPearScene,
        DdrScene,
        SearchScene,
        EndScene
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