class TransitionScene extends PIXI.Container {

    constructor (game) {
        super();
        
        this._game = game;
        this.state = "";

        // screen message
        let message = new PIXI.Text("Well Done!");
        message.position.set(100,50);
        this.message = message;
        this.addChild(message);

        // retry button
        let retry = new PIXI.Text("Retry");
        retry.position.set(100,100);
        this.button = retry;
        this.addChild(retry);
        this.retry = retry;

        this.retry.interactive = true;
        this.retry.on('pointerdown', () => this.retryClick() );


        // add to game stage
        this.visible = false;
        this._game.stage.addChild(this);
    }


    start(message, button) {
        this.message.text = message;
        this.button.text = button;
        this.visible = true;
        this.state = ""
    }

    stop() {
        this.visible = false;
    }

    retryClick() {
        this.state = "RETRY"
    }

}