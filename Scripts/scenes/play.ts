//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 5, 2016

module scenes {
    export class Play extends objects.Scene {

        private _bg: createjs.Bitmap;

        private _chuck: createjs.Bitmap;
        private _tomahawk: objects.Tomahawk;
        private _target: objects.Enemy;
        private _score: createjs.Text;
        private _tomahawks: number;
        private _tomahawkslbl: createjs.Text;

        private _scrollableObjContainer: createjs.Container;
        private _scrollTrigger: number = 350;
        private _scrollSpeed: number = 0;

        constructor() {
            super();
            this.start();
        }

        public start(): void {
            this._scrollableObjContainer = new createjs.Container();

            this._bg = new createjs.Bitmap(assets.getResult("SceneBG"));
            this._scrollableObjContainer.addChild(this._bg);

            score = 0;
            //add score to center of screen
            this._score = new createjs.Text("" + score, "30px 'Kumar One'", "#000000");
            this._score.y = 10;
            this._scrollableObjContainer.addChild(this._score);

            this._tomahawks = 3;
            this._tomahawkslbl = new createjs.Text("" + this._tomahawks, "30px 'Kumar One'", "#000000");
            this._tomahawkslbl.y = 40;
            this._scrollableObjContainer.addChild(this._tomahawkslbl);

            this._chuck = new createjs.Bitmap(assets.getResult("Chuck"));
            this._chuck.x = 350;
            this._chuck.y = config.Screen.HEIGHT - 175;
            this._scrollableObjContainer.addChild(this._chuck);

            this._tomahawk = new objects.Tomahawk("Tomahawk");
            this._tomahawk.position.y = config.Screen.HEIGHT - 100;
            this._tomahawk.position.x = 400;
            this._scrollableObjContainer.addChild(this._tomahawk);

            this._target = new objects.Enemy("Target", new objects.Vector2(1200, config.Screen.HEIGHT - 100), 300, 300, false);
            this._scrollableObjContainer.addChild(this._target);

            this.addChild(this._scrollableObjContainer);

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            stage.addChild(this);
        }

        public update(): void {
            //update labels
            this._score.text = "Score: " + score;
            this._score.x = this._scrollableObjContainer.regX;
            this._tomahawkslbl.text = "Tomahawks: " + this._tomahawks;
            this._tomahawkslbl.x = this._scrollableObjContainer.regX;
            
            //update objects and check collision
            this._tomahawk.update();
            this._target.update();
            collision.check(this._tomahawk, this._target, this._scrollableObjContainer);

            //controlls
            if (controls.JUMP) {
                if (!this._tomahawk.getIsMoving()) {
                    this._tomahawk.throw();
                    this._tomahawks--;
                }
            }
            if (controls.LEFT) {
                this._scrollSpeed -= 5;
            }
            if (controls.RIGHT) {
                this._scrollSpeed += 5;
            }
            if(controls.UP) {
                this._scrollSpeed = 0;
            }

            //console.log("scroll Speed: " + this._scrollSpeed);
            //console.log("score: " + score);

            if (this.checkScroll()) {
                var tomPos = this._tomahawk.position.x;
                if (this._tomahawk.getIsMoving()) {
                    this._scrollSpeed = 0;
                    this._scrollBGForward(tomPos);
                }else{
                    this._scrollBGForward(tomPos += this._scrollSpeed);
                }
            }

            //out of tomahawks
            if(this._tomahawks <= 0){
                //scene = config.Scene.GAMEOVER;
                //changeScene();
            }
            if(this._target.y > 500){
                scene = config.Scene.GAME2;
                changeScene();
            }
        }

        private _onKeyDown(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case keys.W:
                    console.log("W key pressed");
                    controls.UP = true;
                    break;
                case keys.S:
                    console.log("S key pressed");
                    controls.DOWN = true;
                    break;
                case keys.A:
                    console.log("A key pressed");
                    controls.LEFT = true;
                    break;
                case keys.D:
                    console.log("D key pressed");
                    controls.RIGHT = true;
                    break;
                case keys.SPACE:
                    controls.JUMP = true;
                    break;
            }
        }

        private _onKeyUp(event: KeyboardEvent): void {
            switch (event.keyCode) {
                case keys.W:
                    controls.UP = false;
                    break;
                case keys.S:
                    controls.DOWN = false;
                    break;
                case keys.A:
                    controls.LEFT = false;
                    break;
                case keys.D:
                    controls.RIGHT = false;
                    break;
                case keys.SPACE:
                    controls.JUMP = false;
                    break;
            }
        }

        private _scrollBGForward(speed: number): void {
            if (this._scrollableObjContainer.regX < 3071 - 815)
                this._scrollableObjContainer.regX = speed - 300;
        }

        private checkScroll(): boolean {
            if (this._tomahawk.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        }

        private checkCollision(obj1: objects.GameObject, obj2: objects.GameObject): boolean {

            if (obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }

            return false;
        }
    }
}