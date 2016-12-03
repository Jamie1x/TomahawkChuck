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
            this._gravity = 3;
            this._isGrounded = false;
            this._isThrown = false;
            this._speed = 15;
            this.start();
        }
        Tomahawk.prototype.start = function () {
            this.gotoAndStop(6);
            this._velocity = new objects.Vector2(0, 0);
            this.position = new objects.Vector2(30, 0);
            this.scaleX = this.scaleX / 2;
            this.scaleY = this.scaleY / 2;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        };
        Tomahawk.prototype.update = function () {
            //may change to config.Screen.CENTER_X
            this._mouseX = stage.mouseX - this.x;
            this._mouseY = stage.mouseY - this.y;
            if (this._isThrown) {
                this.rotation += 5;
                this.gotoAndStop(3);
                if (this._isGrounded) {
                    this._velocity.y = 0;
                    this._velocity.x = 0;
                    this.rotation = 0;
                    this._isThrown = false;
                }
                else {
                    this._velocity.y += this._gravity;
                }
            }
            if (this.position.y >= config.Screen.HEIGHT) {
                this._isGrounded = true;
            }
            // Position
            this.position.x += this._velocity.x;
            this.position.y += this._velocity.y;
            //restraints
            if (this._velocity.x > this._speed) {
                this._velocity.x = this._speed;
            }
            /*if(this._velocity.y < -this._speed){
                this._velocity.y = this._speed;
            }*/
            if (this._velocity.y > this._gravity) {
                this._velocity.y = this._gravity;
            }
            console.log("Position" + this.position + " Vel: " + this._velocity);
            console.log("X: " + stage.mouseX + " Y: " + stage.mouseY);
            _super.prototype.update.call(this);
        };
        Tomahawk.prototype.throw = function () {
            this.setIsGrounded(false);
            //will change depending on mouse
            this._velocity.x = this._mouseX / 5;
            this._velocity.y = this._mouseY / 5;
            this._isThrown = true;
        };
        /*public resetAcceleration(): void {
            this._velocity.x = 0;
            this.gotoAndStop("Tomahawk");
        }*/
        //getters and setters
        Tomahawk.prototype.getVelocity = function () {
            return this._velocity;
        };
        Tomahawk.prototype.setVelocity = function (newVelocity) {
            this._velocity = newVelocity;
        };
        Tomahawk.prototype.getIsGrounded = function () {
            return this._isGrounded;
        };
        Tomahawk.prototype.setIsGrounded = function (b) {
            this._isGrounded = b;
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