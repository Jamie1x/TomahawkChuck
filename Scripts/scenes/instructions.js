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
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        // Menu Class Contructor
        function Instructions() {
            _super.call(this);
        }
        Instructions.prototype.start = function () {
            // Add menu scene to global stage container
            //add background
            this._bg = new createjs.Bitmap(assets.getResult("InstructionsBG"));
            this.addChild(this._bg);
            //add buttons
            this._playBtn = new objects.Button("PlayBtn", config.Screen.CENTER_X - 150, config.Screen.CENTER_Y + 225);
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);
            this._menuBtn = new objects.Button("MenuBtn", config.Screen.CENTER_X + 150, config.Screen.CENTER_Y + 225);
            this.addChild(this._menuBtn);
            this._menuBtn.on("click", this._menuBtnClick, this);
            stage.addChild(this);
        };
        Instructions.prototype.update = function () {
        };
        Instructions.prototype._playBtnClick = function (event) {
            scene = config.Scene.GAME;
            changeScene();
        };
        Instructions.prototype._menuBtnClick = function (event) {
            scene = config.Scene.MENU;
            changeScene();
        };
        return Instructions;
    })(objects.Scene);
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=instructions.js.map