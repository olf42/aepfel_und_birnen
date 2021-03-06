import Phaser from 'phaser'
import WebFont from 'webfontloader'
import Grayscale from '../shader/Grayscale'
import SolidColor from '../shader/SolidColor'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'BootScene' })
    }

    preload () {
        //load images and audio
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

        // add costum shader pipelines
        this.sys.game.shaders.grayscale = this.sys.game.renderer.addPipeline('Grayscale', new Grayscale(this.sys.game));
        this.sys.game.shaders.solidColor = this.sys.game.renderer.addPipeline('SolidColor', new SolidColor(this.sys.game));

        // display loading progress
        this.loadingText = this.add.text(640, 360, "... loading 0 %", { font: "18px Courier", fill: "#555"})       
        this.loadingText.setOrigin(0.5, 0.5) 
        this.load.on(
            'progress', 
            (n) => { 
                this.loadingText.setText("... loading "+Math.ceil(n*100)+" %")  
                if (n == 1) {
                    this.loadingText.setText("starting ...")
                }
            }
        )
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