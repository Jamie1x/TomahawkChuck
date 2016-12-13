/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//November 28, 2016
var scenes;
(function (scenes) {
    var Winner = (function (_super) {
        __extends(Winner, _super);
        // Menu Class Contructor
        function Winner() {
            _super.call(this);
        }
        Winner.prototype.start = function () {
            // Add menu scene to global stage container
            //add background
            this._bg = new createjs.Bitmap(assets.getResult("YouWinBG"));
            this.addChild(this._bg);
            //add buttons
            this._menuBtn = new objects.Button("MenuBtn", config.Screen.CENTER_X, config.Screen.CENTER_Y + 100);
            this.addChild(this._menuBtn);
            this._menuBtn.on("click", this._menuBtnClick, this);
            stage.addChild(this);
        };
        Winner.prototype.update = function () {
        };
        Winner.prototype._menuBtnClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Winner;
    })(objects.Scene);
    scenes.Winner = Winner;
})(scenes || (scenes = {}));
//# sourceMappingURL=winner.js.map