//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 5, 2016

module scenes {
    export class Play2 extends objects.Scene {

        private _bg: createjs.Bitmap;

        private _chuck: createjs.Bitmap;
        private _tomahawk: objects.Tomahawk;
        private _enemies: objects.Enemy[];

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

            this._chuck = new createjs.Bitmap(assets.getResult("Chuck"));
            this._chuck.x = 350;
            this._chuck.y = config.Screen.HEIGHT - 175;
            this._scrollableObjContainer.addChild(this._chuck);

            this._tomahawk = new objects.Tomahawk("Tomahawk");
            this._tomahawk.position.y = config.Screen.HEIGHT - 100;
            this._tomahawk.position.x = 400;
            this._scrollableObjContainer.addChild(this._tomahawk);

            this._enemies = [];
            this._enemies.push(new objects.Enemy("Colonist", new objects.Vector2(900, config.Screen.HEIGHT - 100), 450, 1350, true));
            this._enemies.push(new objects.Enemy("Colonist", new objects.Vector2(1800, config.Screen.HEIGHT - 100), 1350, 2250, true))

            for (let enemy of this._enemies) {
                this._scrollableObjContainer.addChild(enemy);
            }

            this.addChild(this._scrollableObjContainer);

            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;

            stage.addChild(this);
        }

        public update(): void {

            this._tomahawk.update();
            for (let enemy of this._enemies) {
                enemy.update();
                collision.check(this._tomahawk, enemy, this._scrollableObjContainer);
            }

            if (controls.JUMP) {
                if (!this._tomahawk.getIsThrown()) {
                    this._tomahawk.throw();
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

            console.log("scroll Speed: " + this._scrollSpeed);

            if (this.checkScroll()) {
                var tomPos = this._tomahawk.position.x;
                if (this._tomahawk.getIsMoving()) {
                    this._scrollSpeed = 0;
                    this._scrollBGForward(tomPos);
                }else{
                    this._scrollBGForward(tomPos += this._scrollSpeed);
                }
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