//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 5, 2016

module scenes {
    export class Play extends objects.Scene {

        private _bg: createjs.Bitmap;

        private _chuck: createjs.Bitmap;
        private _tomahawk: objects.Tomahawk;
        private _target: objects.Enemy;
        //GUI
        private _scoreLbl: createjs.Text;
        private _enemiesLbl: createjs.Text;
        private _enemiesPic: createjs.Sprite;
        private _tomahawksLbl: createjs.Text;
        private _tomahawkPic: createjs.Sprite;
        private _DAmessage: createjs.Text;
        private _Wmessage: createjs.Text;

        private _arc: createjs.Shape;
        private _mouseX: number;

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

            tomahawks = 3;
            this._tomahawksLbl = new createjs.Text("" + tomahawks, "30px 'Kumar One'", "#000000");
            this._tomahawksLbl.y = 10;
            this._scrollableObjContainer.addChild(this._tomahawksLbl);
            this._tomahawkPic = new createjs.Sprite(atlas, "Tomahawk");
            this._tomahawkPic.y = 15;
            this._tomahawkPic.scaleX = this._tomahawkPic.scaleX / 3;
            this._tomahawkPic.scaleY = this._tomahawkPic.scaleY / 3;
            this._scrollableObjContainer.addChild(this._tomahawkPic);

            enemiesLeft = 1;
            this._enemiesLbl = new createjs.Text("" + tomahawks, "30px 'Kumar One'", "#000000");
            this._enemiesLbl.y = 10;
            this._enemiesLbl.x = 400;
            this._scrollableObjContainer.addChild(this._enemiesLbl);
            this._enemiesPic = new createjs.Sprite(atlas, "Target");
            this._enemiesPic.y = 15;
            this._enemiesPic.scaleX = this._enemiesPic.scaleX / 3;
            this._enemiesPic.scaleY = this._enemiesPic.scaleY / 3;
            this._scrollableObjContainer.addChild(this._enemiesPic);

            score = 0;
            this._scoreLbl = new createjs.Text("" + score, "30px 'Kumar One'", "#000000");
            this._scoreLbl.y = 10;
            this._scoreLbl.x = 800;
            this._scrollableObjContainer.addChild(this._scoreLbl);

            this._DAmessage = new createjs.Text("A and D to scroll camera", "45px 'Kumar One'", "#000000");
            this._DAmessage.y = config.Screen.CENTER_Y;
            this._DAmessage.x = config.Screen.CENTER_X - 200;
            this._scrollableObjContainer.addChild(this._DAmessage);

            this._Wmessage = new createjs.Text("fire or press W to snap to player", "45px 'Kumar One'", "#000000");
            this._Wmessage.y = config.Screen.CENTER_Y;
            this._Wmessage.x = 1400;
            this._scrollableObjContainer.addChild(this._Wmessage);

            this._chuck = new createjs.Bitmap(assets.getResult("Chuck"));
            this._chuck.x = 350;
            this._chuck.y = config.Screen.HEIGHT - 175;
            this._scrollableObjContainer.addChild(this._chuck);

            this._arc = new createjs.Shape();
            this._scrollableObjContainer.addChild(this._arc);

            this._tomahawk = new objects.Tomahawk("Tomahawk");
            this._tomahawk.position.y = config.Screen.HEIGHT - 100;
            this._tomahawk.position.x = 400;
            this._scrollableObjContainer.addChild(this._tomahawk);

            this._target = new objects.Enemy("Target", new objects.Vector2(1800, config.Screen.HEIGHT - 100), 300, 300, false, false);
            this._scrollableObjContainer.addChild(this._target);

            this.addChild(this._scrollableObjContainer);

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            stage.addChild(this);
        }

        public update(): void {
            //update labels
            this._scoreLbl.text = "Score: " + score;
            this._scoreLbl.x = this._scrollableObjContainer.regX + 600;
            this._tomahawksLbl.text = ": " + tomahawks;
            this._tomahawksLbl.x = this._scrollableObjContainer.regX + 50;
            this._tomahawkPic.x = this._scrollableObjContainer.regX + 10;
            this._enemiesLbl.text = ": " + enemiesLeft;
            this._enemiesLbl.x = this._scrollableObjContainer.regX + 350;
            this._enemiesPic.x = this._scrollableObjContainer.regX + 300;

            this._mouseX = stage.mouseX - 400;
            this._arc.graphics.clear();
            if (stage.mouseX >= 400) {
                this._arc.graphics.beginStroke("#ff0000").arc(this._mouseX * 2 + 400, config.Screen.HEIGHT - 100, this._mouseX * 2, Math.PI, Math.PI*2, false);
            }

            //console.log(this._target.getIsDead());

            //update objects and check collision
            this._tomahawk.update();
            this._target.update();
            if (this._tomahawk.getIsMoving()) {
                collision.check(this._tomahawk, this._target, this._scrollableObjContainer);
            }

            //controlls
            if (controls.JUMP && stage.mouseX >= 400) {
                if (!this._tomahawk.getIsMoving() && !this._tomahawk.getIsGrounded()) {
                    this._tomahawk.throw();
                                    createjs.Sound.play("Woosh");

                }
            }
            if (controls.LEFT) {
                this._scrollSpeed -= 5;
            }
            if (controls.RIGHT) {
                this._scrollSpeed += 5;
            }
            if (controls.UP) {
                this._scrollSpeed = 0;
            }

            //console.log("scroll Speed: " + this._scrollSpeed);
            //console.log("score: " + score);
            //console.log("X: " + this._arc.x + " Y: " + this._arc.y);

            if (this.checkScroll()) {
                var tomPos = this._tomahawk.position.x;
                if (this._tomahawk.getIsMoving()) {
                    this._scrollSpeed = 0;
                    this._scrollBGForward(tomPos);
                } else {
                    this._scrollBGForward(tomPos += this._scrollSpeed);
                }
            }

            //out of tomahawks
            if (tomahawks <= 0) {
                scene = config.Scene.GAMEOVER;
                changeScene();
            }
            if (enemiesLeft <= 0) {
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
    }
}