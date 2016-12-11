/// <reference path = "_reference.ts" />
//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//December 5, 2016
// Global Variables
var assets;
var canvas;
var stage;
var spriteSheetLoader;
var atlas;
var score;
var currentScene;
var scene;
var collision;
// Preload Assets required
var assetData = [
    { id: "BG", src: "../../Assets/images/bg.png" },
    { id: "Title", src: "../../Assets/images/title.png" },
    { id: "PlayBtn", src: "../../Assets/images/playBtn.png" },
    { id: "InstructionsBtn", src: "../../Assets/images/instructionsBtn.png" },
    { id: "SceneBG", src: "../../Assets/images/allScene.png" },
    { id: "Chuck", src: "../../Assets/images/chuck.png" },
    { id: "Ark", src: "../../Assets/images/ark.png" },
    { id: "atlas", src: "../../Assets/images/atlas.png" },
    { id: "theme", src: "../../Assets/audio/POL-mazy-jungle-short.wav" }
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
    collision = new managers.Collision();
    //createjs.Sound.play("theme", 0, 0, 0, 1000);
    var atlasData = {
        "images": [
            assets.getResult("atlas")
        ],
        "frames": [
            [0, 0, 107, 123, 0, 0, 0],
            [107, 0, 85, 98, 0, 0, 0],
            [192, 0, 91, 97, 0, 0, 0],
            [283, 0, 89, 100, 0, 0, 0],
            [372, 0, 75, 100, 0, 0, 0]
        ],
        "animations": {
            "ChuckS": { "frames": [0] },
            "Colonist": { "frames": [1] },
            "Cowboy": { "frames": [2] },
            "Target": { "frames": [3] },
            "Tomahawk": { "frames": [4] }
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
        case config.Scene.GAME2:
            stage.removeAllChildren();
            currentScene = new scenes.Play2();
            console.log("Starting PLAY2 scene");
            break;
        case config.Scene.GAME3:
            stage.removeAllChildren();
            currentScene = new scenes.Play3();
            console.log("Starting PLAY3 scene");
            break;
        case config.Scene.WINNER:
            stage.removeAllChildren();
            currentScene = new scenes.Winner();
            console.log("Starting WINNER scene");
            break;
        case config.Scene.GAMEOVER:
            stage.removeAllChildren();
            currentScene = new scenes.GameOver();
            console.log("Starting GAMEOVER scene");
            break;
        case config.Scene.INSTRUCTIONS:
            stage.removeAllChildren();
            currentScene = new scenes.Instructions();
            console.log("Starting INSTRUCTIONS scene");
            break;
    }
}
//# sourceMappingURL=game.js.map