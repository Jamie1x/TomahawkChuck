/// <reference path = "_reference.ts" />
//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//December 3, 2016
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
    { id: "SceneBG", src: "../../Assets/images/allScene.png" },
    { id: "Floor", src: "../../Assets/images/floor.png" },
    { id: "atlas", src: "../../Assets/images/Tomahawk.png" },
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
    var atlasData = {
        "images": [
            assets.getResult("atlas")
        ],
        "frames": [
            [841, 682, 387, 418, 0, 0, 0],
            [1, 330, 473, 347, 0, 0, 0],
            [1, 1, 436, 327, 0, 0, 0],
            [421, 679, 418, 387, 0, 0, 0],
            [1426, 333, 347, 473, 0, 0, 0],
            [877, 1, 327, 436, 0, 0, 0],
            [1261, 682, 387, 418, 0, 0, 0],
            [476, 330, 473, 347, 0, 0, 0],
            [439, 1, 436, 327, 0, 0, 0],
            [1, 679, 418, 387, 0, 0, 0],
            [951, 333, 347, 473, 0, 0, 0],
            [1315, 1, 330, 438, 0, 0, 0]
        ],
        "animations": {
            "Tomahawk": { "frames": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], "speed": 0.1 },
        },
    };
    atlas = new createjs.SpriteSheet(atlasData);
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