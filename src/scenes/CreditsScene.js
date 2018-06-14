import Phaser from 'phaser'
import { booksellers } from './credits/booksellers'
import { sampleSize } from 'lodash'
import StickDude from '../images/StickDude'
import { randomColor} from '../utils'
import { addCloudEmitter } from './bouncyLevels/utils'

export default class extends Phaser.Scene {
    constructor () {
        super ( { key: 'CreditsScene' } )
    }

    addLine (line, font, color='#999', delay, center=640) {
        this.timer += delay
        let text = this.add.text(center, 750, line, {
            font: font,
            fill: color
        }).setOrigin(0.5, 0)
        this.tweens.add({
            targets: text,
            y: -100,
            duration: 20000,
            ease: 'Linear',
            delay: this.timer
        })
    }

    addBlock (block, delay, center=640) {
        this.addLine(block.header, '24px Ultra', '#999', delay, center)
        this.timer += 1000
        for (const line of block.lines) {
            this.addLine(line, '24px Brr Serif', '#999', 800, center)
        }
    }

    endLine () {
        this.timer += 8000
        let text = this.add.text(640, 750, "Fin", {
            font: '48px Bree Serif',
            fill: '#999'
        }).setOrigin(0.5, 0.5)
        this.tweens.add({
            targets: text,
            y: 360,
            duration: 10000,
            ease: 'Linear',
            delay: this.timer
        })

        let question = this.add.text(700, 360, "?", {
            font: '48px Bree Serif',
            fill: '#999'
        }).setOrigin(0.5, 0.5).setAlpha(0)
        this.tweens.add({
            targets: question,
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            delay: this.timer+13000
        })
    }

    create () {
        this.sys.game.ac.play(this, 'credits')

        this.timer = 0

        this.addLine('diggr präsentiert',  '36px Bree Serif', '#999', 0)
        this.addLine('ein "the peargroup" Spiel', '36px Bree Serif', '#999', 3000)
        this.addLine('Äpfel und Birnen', '48px Ultra', '#666', 7000)

        // the peargrup <3
        let block = {
            header: "the peargroup",
            lines:[
                "Tracy Hoffmann",
                "Peter Mühleder",
                "Florian Rämisch"
            ]
        }
        this.addBlock(block, 7000)

        // music block
        block = {
            header: "Musik",
            lines:[
                "Konstantin Freybe",
                "Florian Rämisch"
            ]
        }
        this.addBlock(block, 4000, 640-250)

        // apple and pears block + random color fruits 
        setTimeout(() => {
            this.apple = this.add.image(1400, Phaser.Math.Between(100,650), this.sys.game.im.random('apples'))
            this.apple.setTint(randomColor()).setAlpha(0.3)
            this.tweens.add({
                targets: this.apple,
                x: -200,
                y: Phaser.Math.Between(0, 600),
                duration: 15000
            })
        }, this.timer + 9000)
        setTimeout(() => {
            this.pear = this.add.image(-200, Phaser.Math.Between(100,650), this.sys.game.im.random('pears'))
            this.pear.setTint(randomColor()).setAlpha(0.3)
            this.tweens.add({
                targets: this.pear,
                x: 1500,
                y: Phaser.Math.Between(0, 600),
                duration: 15000
            })
        }, this.timer + 17000)

        block = {
            header: "Äpfel & Birnen",
            lines:[
                "Die Bergamotte von Soulers",
                "Die große Russelet",
                "Die Petersbirn",
                "Die große Zwiebelbirn",
                "Die spanische gute Christen Birn",
                "Die gute Luise",
                "Die Venusbrust",
                "Der Winter Veilchenapfel",
                "Der große Jungfernapfel",
                "Der kleine Jungfernapfel",
                "Der rote Herbst Kronenapfel",
                "Der schwarze Borsdorfer Apfel",
                "Die Reinette von Breda",
                "Der gelbe Herbst Süßapfel",
                "Der Winter Streifling",
                "Der weiße Sommer Erdbeerapfel",
                "Der rothe Tauben Apfel",
                "Die rote Reinette",
                "Der gelbe Würzapfel",
                "Der Veilchenapfel",
                " ",
                "Modellfrüchte aus Wachs",
                "Stiftung Schloss Friedenstein "
            ]
        }
        this.addBlock(block, 4000, 640+250)

        // bookseller block + stick dude
        const stickDude = new StickDude(this, 890, 360, 240)
        stickDude.fadeIn(5000, this.timer+22000)
        stickDude.fadeOut(5000, this.timer+75000)

        const lines = sampleSize(booksellers, 96)
        lines.push(" ")
        lines.push("Buchhändlerportraits")
        lines.push(" Deutsche Nationalbibliothek")
        lines.push("Deutsches Buch- und Schriftmuseum Leipzig")
        block = {
            header: "Buchhändlerinnen",
            lines: lines
        }
        this.addBlock(block, 4000, 640-250)        

        // start coulds and end credits
        setTimeout(() => {
            this.cloudEmitter = addCloudEmitter(this, false)
        }, this.timer+0)
        //credits end
        this.endLine()
    }

    update(time, delta) {
        if (this.apple) {
            this.apple.rotation -= delta/700
        }
        if (this.pear) {
            this.pear.rotation += delta/700
        }
    }
}