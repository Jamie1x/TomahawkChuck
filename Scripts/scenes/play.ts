//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 3, 2016

module scenes {
    export class Play extends objects.Scene {

        private _bg: createjs.Bitmap;

        private _ground: createjs.Bitmap;
        private _tomahawk: objects.Tomahawk;

        private _scrollableObjContainer: createjs.Container;

        private _scrollTrigger: number = 350;

        constructor() {
            super();
            this.start();
        }

        public start(): void {
            this._scrollableObjContainer = new createjs.Container();

            this._bg = new createjs.Bitmap(assets.getResult("SceneBG"));
            this._ground = new createjs.Bitmap(assets.getResult("Floor"));
            this._tomahawk = new objects.Tomahawk("Tomahawk");
            this._tomahawk.position.y = config.Screen.HEIGHT - 30;
            this._tomahawk.position.x = 50;

            this._scrollableObjContainer.addChild(this._bg);
            this._scrollableObjContainer.addChild(this._ground);
            this._scrollableObjContainer.addChild(this._tomahawk);

            this._ground.y = 535;

            this.addChild(this._scrollableObjContainer);

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            //createjs.Sound.play("theme");

            stage.addChild(this);
        }

        public update(): void {

            /*if(!this._tomahawk.getIsGrounded())
                this._checkTomahawkWithFloor();
            this._tomahawk.update();*/

            if (controls.JUMP) {
                if (!this._tomahawk.getIsThrown()) {
                    this._tomahawk.throw();
                }
            }

            this._tomahawk.update();

            if (this.checkScroll()) {
                this._scrollBGForward(this._tomahawk.position.x);
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

        private _checkTomahawkWithFloor(): void {
            if (this._tomahawk.y + this._tomahawk.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._tomahawk.position.y = this._ground.y - this._tomahawk.getBounds().height;
                this._tomahawk.setIsGrounded(true);
            }
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