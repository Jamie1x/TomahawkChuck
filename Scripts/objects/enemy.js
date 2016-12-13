//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//December 5, 2016
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(imageString, defaultPosition, node1, node2, isPacing, isCharging) {
            _super.call(this, imageString);
            this._isClosing = false;
            this._isDead = false;
            //this._animation = imageString;
            this.x = defaultPosition.x;
            this.y = defaultPosition.y;
            this._node1 = node1;
            this._node2 = node2;
            this._isPacing = isPacing;
            this._isCharging = isCharging;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }
        Enemy.prototype.start = function () {
            this._deathAnimation = "Explode";
            this.gotoAndStop(this.currentAnimation);
        };
        Enemy.prototype.update = function () {
            //shoots enemy up until it hits the center. then retracts
            if (this._isPacing) {
                if (this._isClosing) {
                    this.setTransform(this.x -= 3, this.y, this.scaleX = -1, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
                }
                else {
                    this.setTransform(this.x += 3, this.y, this.scaleX = 1, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
                }
                //I am aware this boolean is pointless. but it works so im not changing it
                if (this.x <= this._node1) {
                    this._isClosing = false;
                }
                if (this.x >= this._node2) {
                    this._isClosing = true;
                }
            }
            if (this._isCharging) {
                this.setTransform(this.x -= 6, this.y, this.scaleX = -1, this.scaleY);
            }
            if (this._isDead && this.currentAnimationFrame == atlas.getNumFrames(this._deathAnimation) - 1) {
                this.Dead();
            }
        };
        Enemy.prototype.Destroy = function () {
            createjs.Sound.play("Boom");
            this.gotoAndPlay(this._deathAnimation);
            this.setIsDead(true);
        };
        Enemy.prototype.Dead = function () {
            this.setIsDead(false);
            this.y = 1000;
            enemiesLeft--;
            score++;
        };
        Enemy.prototype.setIsDead = function (death) {
            this._isDead = death;
        };
        Enemy.prototype.getIsDead = function () {
            return this._isDead;
        };
        Enemy.prototype.setPosition = function (pos) {
            this.x = pos.x;
            this.y = pos.y;
        };
        Enemy.prototype.getPosition = function () {
            return new objects.Vector2(this.x, this.y);
        };
        return Enemy;
    })(objects.GameObject);
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map