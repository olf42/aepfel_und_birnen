import Phaser from 'phaser'
import WebFont from 'webfontloader'
import Grayscale from '../shader/Grayscale'
import SolidColor from '../shader/SolidColor'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene' })
    }

    preload () {

        this.sys.game.im.load(this)
        this.sys.game.ac.load(this)
        
        // load webfont
        this.fontsReady = false
        this.loadingFonts = this.loadingFonts.bind(this)
        WebFont.load({
            google: {
                families: ['Ultra', 'Bree Serif']
            },
            active: this.loadingFonts
        })

        this.sys.game.shaders.grayscale = this.sys.game.renderer.addPipeline('Grayscale', new Grayscale(this.sys.game));
        this.sys.game.shaders.solidColor = this.sys.game.renderer.addPipeline('SolidColor', new SolidColor(this.sys.game));
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