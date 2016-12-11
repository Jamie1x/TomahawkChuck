/*
    Scene module to group all user-defined scenes  under the same "namespace aka module"
    Menu scene that contains all assets and functionality associated with the menu itself
*/

//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//November 28, 2016

module scenes {
    export class Winner extends objects.Scene {

        // Private instance variables
        // Label or bitmap
        // Button 
        private _bg: createjs.Bitmap;
        private _title: createjs.Bitmap;
        private _playBtn : objects.Button;
        private _menuBtn: objects.Button;
        // Menu Class Contructor
        constructor() {
            super();
        }

        public start() : void {
            // Add menu scene to global stage container
            //add background
            this._bg = new createjs.Bitmap(assets.getResult("BG"));
            this.addChild(this._bg);

            //add title
            this._title = new createjs.Bitmap(assets.getResult("PlayBtn"));
            this._title.x = config.Screen.CENTER_X / 3;
            this._title.y = config.Screen.CENTER_Y / 2;
            this.addChild(this._title);

            //add buttons
            this._playBtn = new objects.Button("PlayBtn", config.Screen.CENTER_X - 150, config.Screen.CENTER_Y + 100);
            this.addChild(this._playBtn);
            this._playBtn.on("click", this._playBtnClick, this);

            this._menuBtn = new objects.Button("MenuBtn", config.Screen.CENTER_X + 150, config.Screen.CENTER_Y + 100);
            this.addChild(this._menuBtn);
            this._menuBtn.on("click", this._menuBtnClick, this);

            stage.addChild(this);
        }

        public update() : void {

        }

        private _playBtnClick(event : createjs.MouseEvent) {
            scene = config.Scene.GAME;
            changeScene();
        }

        private _menuBtnClick(event : createjs.MouseEvent){
            scene = config.Scene.MENU;
            changeScene();
        }
    }
}