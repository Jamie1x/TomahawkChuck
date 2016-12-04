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
            this._gravity = 9.81;
            //state transition booleans
            this._isThrown = false;
            this._isMoving = false;
            this._isMjolnir = false;
            this._speed = 15;
            this._timer = 300;
            this.start();
        }
        Tomahawk.prototype.start = function () {
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(30, 0);
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this._startPos = this.position;
        };
        Tomahawk.prototype.update = function () {
            this._startDiffX = this._startPos.x - this.x;
            this._startDiffY = this._startPos.y - this.y;
            if (this._isThrown) {
                this._isMoving = true;
                this._isThrown = false;
                //will change depending on mouse
                this._velocity.x = (this._mouseX / 23) * 2;
                this._velocity.y = ((this._mouseY / 23) * this._gravity * 0.5);
            }
            // Position
            if (this._isMoving) {
                this.rotation += 5;
                this.position.x += this._velocity.x;
                this.position.y += this._velocity.y;
                this._velocity.y += this._gravity;
            }
            else {
                this._velocity.y = 0;
                this._velocity.x = 0;
                this.rotation = 0;
                this._isThrown = false;
            }
            //restraints
            if (this.position.y >= config.Screen.HEIGHT - 100) {
                this._isMoving = false;
            }
            if (this._velocity.x > this._speed) {
                this._velocity.x = this._speed;
            }
            if (this._velocity.y > this._gravity) {
                this._velocity.y = this._gravity;
            }
            console.log("Position" + this.position + " Vel: " + this._velocity);
            console.log("X: " + stage.mouseX + " Y: " + stage.mouseY);
            //console.log("timer: " + this._timer);
            _super.prototype.update.call(this);
        };
        Tomahawk.prototype.throw = function () {
            if (!this._isMoving) {
                //may change to config.Screen.CENTER_X
                this._mouseX = stage.mouseX - this.x;
                this._mouseY = stage.mouseY - this.y;
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
        return Tomahawk;
    })(objects.GameObject);
    objects.Tomahawk = Tomahawk;
})(objects || (objects = {}));
//# sourceMappingURL=tomahawk.js.map