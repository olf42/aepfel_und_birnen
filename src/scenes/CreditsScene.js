import Phaser from 'phaser'
import { booksellers } from './credits/booksellers'
import { sampleSize } from 'lodash'


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

        let block = {
            header: "the peargroup",
            lines:[
                "Tracy Hoffman",
                "Peter Mühleder",
                "Florian Rämisch"
            ]
        }
        this.addBlock(block, 7000)

        block = {
            header: "Musik",
            lines:[
                "Konstantin Freybe",
                "Florian Rämisch"
            ]
        }
        this.addBlock(block, 4000, 640-250)

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

        const lines = sampleSize(booksellers, 100)

        block = {
            header: "Buchhändlerinnen",
            lines: lines
        }
        this.addBlock(block, 4000, 640-250)        


        this.endLine()
    }
}