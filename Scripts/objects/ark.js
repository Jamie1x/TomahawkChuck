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
    var Ark = (function (_super) {
        __extends(Ark, _super);
        function Ark() {
            _super.call(this);
            this.graphics.beginStroke("#ff0000").arc(0, 0, this._mouseX, 0, Math.PI, true);
            this.start();
        }
        Ark.prototype.start = function () {
            //this.regX = 0;
            //this.regY = this.getBounds().height;
        };
        Ark.prototype.update = function () {
            this._mouseX = stage.mouseX - this.x;
            this._mouseY = stage.mouseY - this.y;
            this.setTransform(this.x, this.y, this.scaleX = this._mouseX, this.scaleY = this._mouseY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
        };
        return Ark;
    })(createjs.Shape);
    objects.Ark = Ark;
})(objects || (objects = {}));
//# sourceMappingURL=ark.js.map