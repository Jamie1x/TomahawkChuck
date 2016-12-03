//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 3, 2016
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
            this.start();
        }
        Play.prototype.start = function () {
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
        };
        Play.prototype.update = function () {
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
        Play.prototype._checkTomahawkWithFloor = function () {
            if (this._tomahawk.y + this._tomahawk.getBounds().height > this._ground.y) {
                console.log("HIT GROUND");
                this._tomahawk.position.y = this._ground.y - this._tomahawk.getBounds().height;
                this._tomahawk.setIsGrounded(true);
            }
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