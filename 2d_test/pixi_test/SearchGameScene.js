class SearchGameScene extends PIXI.Container {
    constructor (game, level) {
        super();

        this.game = game;
        this.level = level;

        this.countdown;
        this.state;

        this.count = Math.random()*Math.PI;
        this.filter = null;

        this.setup();
    }



    setup() {

        let apple_count = this.level * 15;

        let pear_i = Math.floor(Math.random()*(apple_count/2) + (apple_count/2))

        this.fruits = new PIXI.Container();



        // add apple pears graphics
        for (let i = 0; i < apple_count; i++) {
            //console.log(i)

            if (i === pear_i) {
                let pear = new PIXI.Sprite(PIXI.loader.resources["./assets/si-b-070_001.png"].texture);
                pear.rotation = Math.random() * Math.PI * 2;
                pear.position.set(randomInt(this.game.screen.width -50), randomInt(this.game.screen.height -50));
                this.pear = pear;
                this.pear.anchor.set(0.5);
                this.pear.interactive = true;
                this.pear.on('pointerdown', () => this.pearClick());
                this.fruits.addChild(pear);
            }


            let apple = new PIXI.Sprite(PIXI.loader.resources["./assets/si-a-013_001.png"].texture);
            apple.position.set(randomInt(this.game.screen.width -50), randomInt(this.game.screen.height -50));
            apple.rotation = Math.random() * Math.PI * 2;
            apple.anchor.set(0.3);
            apple.scale.x = apple.scale.y = Math.random() * 0.5 + 0.5;
            this.fruits.addChild(apple);
        }
        
        this.addChild(this.fruits)
        
        // add countdown object
        let countdown = new Countdown(5, 400,0);
        this.addChild(countdown);
        this.countdown = countdown;

        // add container to game
        this.game.stage.addChild(this);
        this.visible = false;
    }

    stop() {
        this.visible = false;
    }

    start() {
        this.visible = true;
        
this.fruits.filters = [this.filter];
        
        this.blurFilter = new PIXI.filters.BlurFilter();
        this.blurFilter.blur = 0;
        this.fruits.filters = [this.blurFilter];
        if (this.level > 4)
        {
            this.filter = new PIXI.filters.ColorMatrixFilter();
            this.fruits.filters = [this.blurFilter, this.filter];
        }
    }

    update(delta) {
        this.count += 0.04;

        if (this.filter) {
            var matrix = this.filter.matrix;
            
            matrix[1] = Math.sin(this.count) * 3;
            matrix[2] = Math.cos(this.count);
            matrix[3] = Math.cos(this.count) * 1.5;
            matrix[4] = Math.sin(this.count / 3) * 2;
            matrix[5] = Math.sin(this.count / 2);
            matrix[6] = Math.sin(this.count / 4);
        }

        if (this.level > 2) {
            for (let i = 0; i < this.fruits.children.length; i++) {
                let fruit = this.fruits.children[i];
                fruit.rotation += 0.01;
            }
        }

        if (this.level > 6) {
            this.blurFilter.blur = 1+Math.sin(this.count) * 3;;
        }


        this.countdown.update(delta);
        if (this.countdown.timeout())
        {
            this.game.stage.filters = null;
            this.state = "TIMEOUT";
        }
    }

    pearClick() {
        this.game.stage.filters = null;
        this.state = "SUCCESS"
    }
}

function randomInt(x) {
    return Math.floor(Math.random()* x);
}