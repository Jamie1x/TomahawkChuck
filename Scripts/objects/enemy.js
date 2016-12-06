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
        function Enemy(imageString, defaultPosition, node1, node2, isPacing) {
            _super.call(this, imageString);
            this._isClosing = false;
            this.x = defaultPosition.x;
            this.y = defaultPosition.y;
            this._node1 = node1;
            this._node2 = node2;
            this._isPacing = isPacing;
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
        }
        Enemy.prototype.start = function () {
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