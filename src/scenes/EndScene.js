import Phaser from 'phaser'
import PsychedelicFilter from '../images/PsychedelicFilter'

export default class extends Phaser.Scene {
    constructor () {
        super({ key: 'EndScene' })
    }

    create () {

        // initialize filters
        this.psychedelicFilter = new PsychedelicFilter()

        // get and display final marx quote with citation
        const quote = this.sys.game.gc.story[3]
        this.frame = this.add.image(610,200, 'frame02').setScale(1).setAlpha(0)
        this.quote = this.add.text(320, 100, quote, {
            font: '24px Bree Serif',
            fill: '#888888'
        }).setAlpha(0)
        this.citation = this.add.text(450, 260, '- Karl Marx u. Friedrich Engels\n Die heilige Familie oder Kritik der kritischen Kritik', {
            font: '20px Bree Serif',
            fill: '#888888'
        }).setAlpha(0)
        this.tweens.add({
            targets: [ this.frame, this.quote, this.citation ],
            alpha: 1,
            ease: 'Linear',
            duration: 2000,
        })

        // show level point scores
        this.ratingHeader = this.add.text(480, 410, 'Gesamtwertung:', {
            font: '24px Ultra',
            fill: '#888888'
        }).setAlpha(0)
        
        const sc = this.sys.game.gc.scoring
        let ratingText = 'Kapitel 1: 200 Punkte\nKapitel 2: 300 Punkte\nKapitel 3: 400 Punkte' // placeholder for debugging
        let finalPoints =  900 // placeholder for debugging
        if (sc.length === 3) {
            ratingText = sc[0].name+": "+sc[0].score+"\n"+sc[1].name+": "+sc[1].score+"\n"+sc[2].name+": "+sc[2].score
            finalPoints = sc[0].score+sc[1].score+sc[2].score
        }
        this.rating = this.add.text(480, 450, ratingText, {
            font: '24px Bree Serif',
            fill: '#888888'
        }).setAlpha(0)
        this.tweens.add({
            targets: [ this.ratingHeader, this.rating ],
            alpha: 0.8,
            ease: 'Linear',
            duration: 2000,      
            delay: 2000      
        })

        // display aggregated points 
        this.finalPoints = this.add.text(480, 575, finalPoints, {
            font: '76pt Ultra',
            fill: '#aaa'
        }).setAlpha(0)

        this.tweens.add({
            targets: this.finalPoints,
            alpha: 1,
            ease: 'Linear',
            duration: 1500,      
            delay: 4000      
        })   

        // show random wizard dude with particles coming from his fingers
        this.dude =  this.add.image(100, 400, 'randomDude').setScale(0.8)
        this.particles = this.add.particles('flare01');
        this.particles.createEmitter({
            x: 435,
            y: 510,
            speed: 300,
            gravityY: 200,
            lifespan: 4000,
            scale: {min: 0.3, max: 0.5},
            blendMode: 'ADD',
            tint: [ 0xffff00, 0xff0000, 0x00ff00, 0x0000ff ],
            //deathZone: { type: 'onEnter', source: rectangles }
        })

        // start credits button
        this.startCredits = this.add.text(950, 680, 'Epilog', {
            font: '30px Bree Serif',
            fill: '#aaa'
        })
        this.startCredits.setOrigin(0.5, 0.5).setInteractive()
        this.startCredits.on('pointerup', (event) => {
            this.scene.start('CreditsScene')
        })   
    }

    update (time, delta) {
        if (this.finalPoints)
            this.psychedelicFilter.apply(this.finalPoints)
    }
}
