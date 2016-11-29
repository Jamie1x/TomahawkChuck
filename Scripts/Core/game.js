/// <reference path = "_reference.ts" />
//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//November 29, 2016
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var atlas;
var currentScene;
var scene;
// Preload Assets required
var assetData = [
    { id: "BG", src: "../../Assets/images/bg.png" },
    { id: "Title", src: "../../Assets/images/title.png" },
    { id: "PlayBtn", src: "../../Assets/images/playBtn.png" },
    { id: "InstructionsBtn", src: "../../Assets/images/instructionsBtn.png" },
    { id: "theme", src: "../../Assets/audio/main_theme.mp3" }
];
function preload() {
    // Create a queue for assets being loaded
    assets = new createjs.LoadQueue(false);
    assets.installPlugin(createjs.Sound);
    // Register callback function to be run when assets complete loading.
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // Reference to canvas element
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(config.Game.FPS);
    createjs.Ticker.on("tick", this.gameLoop, this);
    scene = config.Scene.MENU;
    changeScene();
}
function gameLoop(event) {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}
function changeScene() {
    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();
            ;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME:
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting PLAY scene");
            break;
    }
}
//# sourceMappingURL=game.js.map