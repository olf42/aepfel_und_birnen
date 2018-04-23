class Countdown extends PIXI.Container {

    constructor(counter, x, y) {
        super();

        // initalize counter and position
        this.counter = counter;
        this.position.set(x, y);

        // set up graphical elements
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xff0066);
        graphics.drawRect(-15,-10,55,60);
        graphics.endFill();
        this.addChild(graphics);

        let countdownText = new PIXI.Text(counter,  {
            fontWeight: 'bold',
            fontSize: 40,
            fontFamily: 'Letter Gothic',
            fill: '#ffffff',
            align: 'center'
        });
        this.addChild(countdownText);
        this.display = countdownText;        
    }

    update(delta) {
        this.counter -= delta/60;
        this.display.text = Math.floor(this.counter);         
    }

    timeout() {
        if (this.counter <= 0)
            return true;
        else
            return false;
    }
}