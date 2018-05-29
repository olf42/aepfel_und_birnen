import Phaser from 'phaser'
import { sample } from 'lodash'

export default class ImageManager {
    constructor() {
        this.images = {
            "apples": {
                "apple01": "./assets/apfel_01_klein.png",
                "apple02": "./assets/apfel_02_klein.png",
                "apple03": "./assets/apfel_03_klein.png",
                "apple04": "./assets/apfel_04_klein.png",
                "apple05": "./assets/apfel_05_klein.png",
                "apple06": "./assets/apfel_06_klein.png",
                "apple07": "./assets/apfel_07_klein.png",
                "apple08": "./assets/apfel_08_klein.png",
                "apple09": "./assets/apfel_09_klein.png",
                "apple10": "./assets/apfel_10_klein.png"
            },
            "pears": {
                "pear01": "./assets/birne_01_klein.png",
                "pear02": "./assets/birne_02_klein.png",
                "pear03": "./assets/birne_03_klein.png",
                "pear04": "./assets/birne_04_klein.png",
                "pear05": "./assets/birne_05_klein.png",
                "pear06": "./assets/birne_06_klein.png",
                "pear07": "./assets/birne_07_klein.png",
                "pear08": "./assets/birne_08_klein.png",
                "pear09": "./assets/birne_09_klein.png",
                "pear10": "./assets/birne_10_klein.png"
            },
            "grounds": {
                "ground1": "./assets/ground.png"
            },
            "scenes": {
                "appleDudeApple": "./assets/apfel_fuer_dude.png",
                "appleDudeArm": "./assets/arm.png",
                "appleDude": "./assets/dude_ohne_apfel_ohne_arm_Ausschnitt.png",
                "winkingLady": "./assets/lady_zwinker.png",
                "winkingLadyLid": "./assets/lady_zwinker_lid.png"
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
