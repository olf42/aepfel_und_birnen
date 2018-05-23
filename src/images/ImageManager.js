import Phaser from 'phaser'
import { sample } from 'lodash'

export default class ImageManager {
    constructor() {
        this.images = {
            "apples": {
                "apple1": "./assets/apple.png"
            },
            "pears": {
                "pear1": "./assets/pear.png"
            },
            "grounds": {
                "ground1": "./assets/ground.png"
            },
            "scenes": {
                "appleDudeApple": "./assets/apfel_fuer_dude.png",
                "appleDudeArm": "./assets/arm.png",
                "appleDude": "./assets/dude_ohne_apfel_ohne_arm_Ausschnitt.png",   
            }
        }
    }

    load(scene) {
        for (const [group, image] of Object.entries(this.images)) {
            for (const [key, path] of Object.entries(image)) {
                scene.load.image(key, path)
            }
        }
    }

    random(group) {
        const keys = Object.keys(this.images[group])
        return sample(keys)
    }

}