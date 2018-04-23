class MenuScene extends PIXI.Container {

    constructor (game) {
        super();
        
        this._game = game;
        this.state = "";

        let start = new PIXI.Text("Start");
        start.position.set(100,50);
        this.addChild(start);
        this.start = start;

        this.start.interactive = true;
        this.start.on('pointerdown', () => this.startClick() );

        this._game.stage.addChild(this);
    }

    startClick() {
        this.visible = false;
        this.state = "START_GAME";
        console.log(this.state)
    }

}