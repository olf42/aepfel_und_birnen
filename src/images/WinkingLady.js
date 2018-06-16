import Phaser from 'phaser'
import PsychedelicFilter from './PsychedelicFilter'

export default class WinkingLady {
    constructor(scene, x, y) {
        this.scene = scene
        this.x = x
        this.y = y

        this.disco = false

        this.psychedelicFilter = new PsychedelicFilter()

        this.star = this.scene.add.image(x, y, 'star01').setScale(2).setAlpha(0.8)
        this.star.setBlendMode('ADD').setVisible(false)

        this.lady = this.scene.add.image(x, y, 'winkingLady')
        this.lid = this.scene.add.image(x+28, y-51, 'winkingLadyLid')
        this.lady.setScale(0.4)
        this.lid.setScale(0.4)
        this.lid.visible = false
    }

    wink() {
        this.lid.visible = true
        setTimeout(() => {
            this.lid.visible = false
        }, 50)
    }

    pulse () {
        // console.log('pulse')
        // this.scene.tweens.add( {
        //     targets: this.star,
        //     scale: 10,
        //     duration: 500,
        //     yoyo: true,
        //     ease: 'Linaer',
        //     repeat: 1,
        //     delay: 0  
        // })
    }

    update(time, delta) {
        if (this.disco) {
            this.star.setVisible(true)
            this.star.rotation += delta/500
            this.psychedelicFilter.apply(this.star)
        }
        else {
            this.star.setVisible(false)
        }
    }
}