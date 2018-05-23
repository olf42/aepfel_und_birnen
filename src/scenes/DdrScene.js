import Phaser from 'phaser'

export default class extends Phaser.Scene {
    constructor () {
        super({ "key": "DdrScene" })
    }

    create () {

        // level config
        this.velocity = 3
        this.appleKey = this.sys.game.im.random("apples")
        this.cooldown = 1000

        this.aQueue = {
            x: 300,
            apples: []
        }
        this.sQueue = {
            x: 500,
            apples: []
        }
        this.dQueue = {
            x: 700,
            apples: []
        }

        
        this.bgApple1 = this.add.image(300,600, this.appleKey)
        this.bgApple1.setScale(0.6)
        this.bgApple1.setAlpha(0.5)        
        this.bgApple2 = this.add.image(500,600, this.appleKey)
        this.bgApple2.setScale(0.6)
        this.bgApple2.setAlpha(0.5)
        this.bgApple3 = this.add.image(700,600, this.appleKey)
        this.bgApple3.setScale(0.6)
        this.bgApple3.setAlpha(0.5)


        this.input.keyboard.on('keydown', (event) => {
            switch (event.key) {
                case "d":
                    this.keyPressed(this.dQueue)
                    break
                case "s":
                    this.keyPressed(this.sQueue)
                    break
                case "a":
                    this.keyPressed(this.aQueue)
                    break
            }    
        })

    }

    keyPressed (queue) {
        for (const i in queue.apples) {
            if ((queue.apples[i].y <= 605) && (queue.apples[i].y >= 595)) {
                queue.apples[i].destroy()
                queue.apples.splice(i, 1)
                break
            }
        }
    } 


    update (time, delta) {
        this.cooldown -= delta
        if (this.cooldown < 0) {
            let chance = Phaser.Math.Between(0, 2)
            console.log("add apple")
            switch (chance) {
                case 0:
                    this.addAppleToQueue(this.aQueue)
                    break
                case 1:
                    this.addAppleToQueue(this.sQueue)  
                    break
                case 2:
                    this.addAppleToQueue(this.dQueue)
                    break
            }
            this.cooldown = 1000
        }

        this.updateQueues(this.aQueue)
        this.updateQueues(this.sQueue)
        this.updateQueues(this.dQueue) 

    } 

    addAppleToQueue(queue) {
        let apple = this.add.image(queue.x, Phaser.Math.Between(20,100), this.appleKey)
        apple.setScale(0.5)
        queue.apples.push(apple)
    }

    updateQueues(queue) {
        // console.log(queue.apples.length)
        for (let i in queue.apples) {
            queue.apples[i].y += this.velocity
        }
        if (queue.apples.length > 0) {
            if (queue.apples[0].y > 800) {
                queue.apples[0].destroy()
                queue.apples.shift()
            }
        }
    }
}