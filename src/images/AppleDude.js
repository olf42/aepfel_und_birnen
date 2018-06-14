export default class {
    constructor (scene, x, y) {
        this.scene = scene

        this.dude = this.scene.add.image(x, y, 'appleDude').setAlpha(0)
        this.arm = this.scene.add.image(677+129, 424-25, 'appleDudeArm').setAlpha(0)
        this.arm.setOrigin(1, 0.5)
        this.apple = this.scene.add.image(589+132, 424-25, 'appleDudeApple').setAlpha(0)
        this.finger = this.scene.add.image(677+129, 424-25, 'appleDudeFinger').setAlpha(0).setDepth(50)
        this.finger.setOrigin(1, 0.5)
        
   
    }

    fadeIn (duration, delay=0) {
        this.scene.tweens.add({
            targets: [this.dude, this.arm, this.apple, this.finger],
            alpha: 1,
            duration: duration,
            delay: delay
        })


        this.appleTween = this.scene.tweens.add({
            targets: this.apple,
            y: 300,
            ease: 'Power2',
            duration: 500,
            yoyo: true,
            repeat: -1,
            repeatDelay: 200
        })

        this.armTween = this.scene.tweens.add({
            targets: [this.arm, this.finger],
            rotation: 0.2,
            ease: 'Power1',
            duration: 500,
            yoyo: true,
            repeat: -1,
            repeatDelay: 200
        })    

    }
}