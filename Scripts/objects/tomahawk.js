//COMP397 Final Assignment Pt2
//Jamie Kennedy - 300753196
//December 3, 2016
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Tomahawk = (function (_super) {
        __extends(Tomahawk, _super);
        function Tomahawk(imgString) {
            _super.call(this, imgString);
            //state transition booleans
            this._isThrown = false;
            this._isMoving = false;
            this._hitPeak = false;
            this._isGrounded = false;
            this._speed = 50;
            this._timer = 100;
            this.start();
        }
        Tomahawk.prototype.start = function () {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(30, 0);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.scaleX = this.scaleX / 1.25;
            this.scaleY = this.scaleY / 1.25;
            this._startPos = this.position;
        };
        Tomahawk.prototype.update = function () {
            this._startDiffX = this._startPos.x - this.x;
            this._startDiffY = this._startPos.y - this.y;
            if (this._isThrown) {
                this._isMoving = true;
                this._isThrown = false;
                //will change depending on mouse
                this._velocity.x = 8;
                this._velocity.y = -8;
            }
            // Position
            if (this._isMoving) {
                if (this.position.x >= stage.mouseX * 2 - 400) {
                    this._hitPeak = true;
                }
                this.rotation += 5;
                this.position.x += this._velocity.x;
                if (this._hitPeak) {
                    this.position.y += -this._velocity.y;
                }
                else {
                    this.position.y += this._velocity.y;
                }
            }
            else {
                this._velocity.y = 0;
                this._velocity.x = 0;
                this.rotation = 0;
                this._isThrown = false;
            }
            //hit ground
            if (this.position.y >= config.Screen.HEIGHT) {
                this.rotation = 125;
                this._isMoving = false;
                this._hitPeak = false;
                this._isGrounded = true;
                this._timer--;
                if (this._timer <= 0) {
                    this._isGrounded = false;
                    this._timer = 100;
                    this.position.y = config.Screen.HEIGHT - 100;
                    this.position.x = 400;
                    tomahawks--;
                }
            }
            //restraints
            if (this._velocity.x > this._speed) {
                this._velocity.x = this._speed;
            }
            /*if (this._velocity.y > this._gravity) {
                this._velocity.y = this._gravity;
            }*/
            //console.log("Position" + this.position + " Vel: " + this._velocity);
            //console.log("X: " + stage.mouseX + " Y: " + stage.mouseY);
            //console.log("timer: " + this._timer);
            _super.prototype.update.call(this);
        };
        Tomahawk.prototype.throw = function () {
            if (!this._isMoving) {
                this._mouseX = stage.mouseX - this.x;
                this._isThrown = true;
            }
        };
        //getters and setters
        Tomahawk.prototype.getVelocity = function () {
            return this._velocity;
        };
        Tomahawk.prototype.setVelocity = function (newVelocity) {
            this._velocity = newVelocity;
        };
        Tomahawk.prototype.getIsMoving = function () {
            return this._isMoving;
        };
        Tomahawk.prototype.setIsMoving = function (b) {
            this._isMoving = b;
        };
        Tomahawk.prototype.getIsThrown = function () {
            return this._isThrown;
        };
        Tomahawk.prototype.setIsThrown = function (b) {
            this._isThrown = b;
        };
        Tomahawk.prototype.getIsGrounded = function () {
            return this._isGrounded;
        };
        Tomahawk.prototype.setIsGrounded = function (b) {
            this._isGrounded = b;
        };
        return Tomahawk;
    })(objects.GameObject);
    objects.Tomahawk = Tomahawk;
})(objects || (objects = {}));
//# sourceMappingURL=tomahawk.js.map