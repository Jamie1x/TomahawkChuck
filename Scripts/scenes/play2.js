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
    var Play2 = (function (_super) {
        __extends(Play2, _super);
        function Play2() {
            _super.call(this);
            this._scrollTrigger = 350;
            this._scrollSpeed = 0;
            this.start();
        }
        Play2.prototype.start = function () {
            this._scrollableObjContainer = new createjs.Container();
            this._bg = new createjs.Bitmap(assets.getResult("SceneBG2"));
            this._scrollableObjContainer.addChild(this._bg);
            tomahawks = 7;
            this._tomahawksLbl = new createjs.Text("" + tomahawks, "30px 'Kumar One'", "#000000");
            this._tomahawksLbl.y = 10;
            this._scrollableObjContainer.addChild(this._tomahawksLbl);
            this._tomahawkPic = new createjs.Sprite(atlas, "Tomahawk");
            this._tomahawkPic.y = 15;
            this._tomahawkPic.scaleX = this._tomahawkPic.scaleX / 3;
            this._tomahawkPic.scaleY = this._tomahawkPic.scaleY / 3;
            this._scrollableObjContainer.addChild(this._tomahawkPic);
            enemiesLeft = 4;
            this._enemiesLbl = new createjs.Text("" + tomahawks, "30px 'Kumar One'", "#000000");
            this._enemiesLbl.y = 10;
            this._enemiesLbl.x = 400;
            this._scrollableObjContainer.addChild(this._enemiesLbl);
            this._enemiesPic = new createjs.Sprite(atlas, "Colonist");
            this._enemiesPic.y = 15;
            this._enemiesPic.scaleX = this._enemiesPic.scaleX / 3;
            this._enemiesPic.scaleY = this._enemiesPic.scaleY / 3;
            this._scrollableObjContainer.addChild(this._enemiesPic);
            this._scoreLbl = new createjs.Text("" + score, "30px 'Kumar One'", "#000000");
            this._scoreLbl.y = 10;
            this._scoreLbl.x = 800;
            this._scrollableObjContainer.addChild(this._scoreLbl);
            this._warning = new createjs.Text("SOMEONE'S CHARGING!", "45px 'Kumar One'", "#ffffff");
            this._warning.y = config.Screen.CENTER_Y;
            this._warning.x = config.Screen.CENTER_X - 200;
            this._scrollableObjContainer.addChild(this._warning);
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
            this._enemies = [];
            //charging guy
            this._enemies.push(new objects.Enemy("Colonist", new objects.Vector2(2000, config.Screen.HEIGHT - 175), 750, 1650, false, true));
            //pacing guys
            this._enemies.push(new objects.Enemy("Colonist", new objects.Vector2(1200, config.Screen.HEIGHT - 100), 750, 1650, true, false));
            this._enemies.push(new objects.Enemy("Colonist", new objects.Vector2(1800, config.Screen.HEIGHT - 100), 1350, 2250, true, false));
            this._enemies.push(new objects.Enemy("Colonist", new objects.Vector2(2500, config.Screen.HEIGHT - 100), 1550, 3150, true, false));
            for (var _i = 0, _a = this._enemies; _i < _a.length; _i++) {
                var enemy = _a[_i];
                this._scrollableObjContainer.addChild(enemy);
            }
            this.addChild(this._scrollableObjContainer);
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            stage.addChild(this);
        };
        Play2.prototype.update = function () {
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
                this._arc.graphics.beginStroke("#ff0000").arc(this._mouseX * 2 + 400, config.Screen.HEIGHT - 100, this._mouseX * 2, Math.PI, Math.PI * 2, false);
            }
            //update objects and check collision
            this._tomahawk.update();
            for (var _i = 0, _a = this._enemies; _i < _a.length; _i++) {
                var enemy = _a[_i];
                enemy.update();
                if (this._tomahawk.getIsMoving()) {
                    collision.check(this._tomahawk, enemy, this._scrollableObjContainer);
                }
                collision.checkChuck(enemy, this._chuck, this._scrollableObjContainer);
            }
            //controlls
            if (controls.JUMP && stage.mouseX >= 400) {
                if (!this._tomahawk.getIsMoving() && !this._tomahawk.getIsGrounded()) {
                    this._tomahawk.throw();
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
                }
                else {
                    this._scrollBGForward(tomPos += this._scrollSpeed);
                }
            }
            //out of tomahawks
            if (tomahawks <= 0) {
                scene = config.Scene.GAMEOVER;
                changeScene();
            }
            if (enemiesLeft <= 0) {
                scene = config.Scene.GAME3;
                changeScene();
            }
        };
        Play2.prototype._onKeyDown = function (event) {
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
        Play2.prototype._onKeyUp = function (event) {
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
        Play2.prototype._scrollBGForward = function (speed) {
            if (this._scrollableObjContainer.regX < 3071 - 815)
                this._scrollableObjContainer.regX = speed - 300;
        };
        Play2.prototype.checkScroll = function () {
            if (this._tomahawk.x >= this._scrollTrigger) {
                return true;
            }
            else {
                return false;
            }
        };
        return Play2;
    })(objects.Scene);
    scenes.Play2 = Play2;
})(scenes || (scenes = {}));
//# sourceMappingURL=play2.js.map