import Phaser from 'phaser'

import GameController from './controller/GameController'
import ImageManager from './images/ImageManager'

import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'

// Minigame scenes
import BouncyPearScene from './scenes/BouncyPearScene'
import DdrScene from './scenes/DdrScene'
import SearchScene from './scenes/SearchScene'

var config = {
    type: Phaser.AUTO,
    width:1024,
    height: 768,
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
        BouncyPearScene,
        DdrScene,
        SearchScene
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