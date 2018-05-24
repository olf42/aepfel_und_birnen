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

        // beats queues
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

        // score graphics queue
        this.scorePoints = []

        // markers
        this.bgApple1 = this.add.image(300,600, this.appleKey)
        this.bgApple1.setScale(0.6)
        this.bgApple1.setAlpha(0.5)        
        this.bgApple2 = this.add.image(500,600, this.appleKey)
        this.bgApple2.setScale(0.6)
        this.bgApple2.setAlpha(0.5)
        this.bgApple3 = this.add.image(700,600, this.appleKey)
        this.bgApple3.setScale(0.6)
        this.bgApple3.setAlpha(0.5)

        // input
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
        let i = 0
        for (let apple of queue.apples) {
            if ((apple.y <= 605) && (apple.y >= 595)) {
                apple.destroy()
                queue.apples.splice(i, 1)
                this.addScorePoint(queue.x)
                break
            }
            i++
        }
    } 


    addScorePoint (x) {
        let text = this.add.text(x+20, 550, "+50", {
            font: '56px Ultra',
            fill: '#4e678e'
        })
        this.scorePoints.push({
            text: text,
            duration: 1000
        })
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

        this.updateQueue(this.aQueue)
        this.updateQueue(this.sQueue)
        this.updateQueue(this.dQueue) 

        this.updateScorePoints(delta)
    } 

    addAppleToQueue(queue) {
        let apple = this.add.image(queue.x, 30, this.appleKey)
        apple.setScale(0.5)
        queue.apples.push(apple)
    }

    updateQueue(queue) {
        // console.log(queue.apples.length)
        for (let apple of queue.apples) {
            apple.y += this.velocity
        }
        if (queue.apples.length > 0) {
            if (queue.apples[0].y > 800) {
                queue.apples[0].destroy()
                queue.apples.shift()
            }
        }
    }

    updateScorePoints(delta) {
        for (let points of this.scorePoints) {
            points.duration -= delta
            points.text.alpha -= delta/1000
        }
        if (this.scorePoints.lengths > 0) {
            if (this.scorePoints[0].duration < 0) {
                this.scorePoints.text.destroy()
                this.scorePoints.shift()
            }
        }
    }
}