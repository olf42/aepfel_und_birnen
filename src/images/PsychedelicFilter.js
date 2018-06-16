import Phaser from 'phaser'

export default class {
    constructor () {
        this.tintCounter = 0
        this.hsv = Phaser.Display.Color.HSVColorWheel()
    }

    apply (obj) {
        const top =  this.hsv[Math.floor(this.tintCounter)].color
        const bottom = this.hsv[359 - Math.floor(this.tintCounter)].color
        this.tintCounter += 2;
        if (this.tintCounter >= this.hsv.length)
            this.tintCounter = 0;            
        obj.setTint(top, bottom, bottom, top)
    }

    clear (obj) {
        obj.clearTint()
    }
}