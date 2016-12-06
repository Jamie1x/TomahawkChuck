//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 5, 2016
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scenes;
(function (scenes) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.call(this);
            this._scrollTrigger = 350;
            this._scrollSpeed = 0;
            this.start();
        }
        Play.prototype.start = function () {
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
            this._target = new objects.Enemy("Target", new objects.Vector2(800, config.Screen.HEIGHT - 100), 300, 300, false);
            this._scrollableObjContainer.addChild(this._target);
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            stage.addChild(this);
        };
        Play.prototype.update = function () {
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
            if (controls.UP) {
                this._scrollSpeed = 0;
            }
            //console.log("scroll Speed: " + this._scrollSpeed);
            //console.log("score: " + score);
            if (this.checkScroll()) {
                var tomPos = this._tomahawk.position.x;
                if (this._tomahawk.getIsMoving()) {
                    this._scrollSpeed = 0;
                    this._scrollBGForward(tomPos);
                }
                else {
                    this._scrollBGForward(tomPos += this._scrollSpeed);
                }
            }
            //out of tomahawks
            if (this._tomahawks <= 0) {
            }
            if (this._target.y > 500) {
                scene = config.Scene.GAME2;
                changeScene();
            }
        };
        Play.prototype._onKeyDown = function (event) {
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
        };
        Play.prototype._onKeyUp = function (event) {
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
        };
        Play.prototype._scrollBGForward = function (speed) {
            if (this._scrollableObjContainer.regX < 3071 - 815)
                this._scrollableObjContainer.regX = speed - 300;
        };
        Play.prototype.checkScroll = function () {
            if (this._tomahawk.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        };
        Play.prototype.checkCollision = function (obj1, obj2) {
            if (obj2.x < obj1.x + obj1.getBounds().width &&
                obj2.x + obj2.getBounds().width > obj1.x &&
                obj2.y < obj1.y + obj1.getBounds().height &&
                obj2.y + obj2.getBounds().height > obj1.y - 10) {
                return true;
            }
            return false;
        };
        return Play;
    })(objects.Scene);
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map