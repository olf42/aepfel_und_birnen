import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene' })
    }

    preload () {

        this.sys.game.im.load(this)

        // load webfont
        this.fontsReady = false
        this.loadingFonts = this.loadingFonts.bind(this)
        WebFont.load({
            google: {
                families: ['Ultra', 'Bree Serif']
            },
            active: this.loadingFonts
        })
    }

    create () {}

    update () {
        if (this.fontsReady)
            this.scene.start('MenuScene')
    }

    loadingFonts () {
        this.fontsReady = true
    }
}