import Phaser from 'phaser'

export default class Stickdude {
    constructor(scene, x, y, bpm) {
        this.scene = scene
        this.x = x
        this.y = y
        this.bpm = bpm // beats per minute for stick tween

        this.dude = this.scene.add.image(x, y, 'stickDude')
        this.stick = this.scene.add.image(x-5, y+48, 'stickDudeStick')
        this.cylinder = this.scene.add.image(x+25, y-220, 'stickDudeCylinder')
        this.mouth = this.scene.add.image(x+53, y-165, 'stickDudeMouth')
        this.dude.setScale(0.8)
        this.stick.setScale(0.8)
        this.cylinder.setScale(0.8)
        this.mouth.setScale(0.8)

        this.stickTween = this.scene.tweens.add({
            targets: this.stick,
            rotation: 0.2,
            ease: 'Power4',
            duration: this.bpm,
            yoyo: true,
            repeat: -1,
            repeatDelay: 200,
            delay: 200
        })

        this.cylinderTween = this.scene.tweens.add({
            targets: this.cylinder,
            y: 75,
            x: 168,
            rotation: -0.15,
            ease: 'Power1',
            duration: 900,
            yoyo: true,
            repeat: -1,
            repeatDelay: 257
        })

        this.mouthTween = this.scene.tweens.add({
            targets: this.mouth,
            y: 143,
            x: 200,
            rotation: 0.2,
            ease: 'Power1',
            duration: 900,
            yoyo: true,
            repeat: -1,
            repeatDelay: 257
        })
    }
    
}