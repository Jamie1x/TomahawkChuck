/// <reference path = "_reference.ts" />

//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//December 5, 2016

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader: createjs.SpriteSheetLoader;
var atlas: createjs.SpriteSheet;
var score: number;
var tomahawks: number;
var enemiesLeft: number;

var currentScene: objects.Scene;
var scene: number;
var collision: managers.Collision;

// Preload Assets required
var assetData: objects.Asset[] = [
    { id: "BG", src: "../../Assets/images/bg.png" },
    { id: "YouWinBG", src: "../../Assets/images/youWin.png" },
    { id: "GameOverBG", src: "../../Assets/images/gameOver.png" },
    { id: "InstructionsBG", src: "../../Assets/images/instructions.png" },
    { id: "PlayBtn", src: "../../Assets/images/playBtn.png" },
    { id: "InstructionsBtn", src: "../../Assets/images/instructionsBtn.png" },
    { id: "MenuBtn", src: "../../Assets/images/menuBtn.png" },
    { id: "SceneBG", src: "../../Assets/images/allScene.png" },
    { id: "SceneBG2", src: "../../Assets/images/allScene2.png" },
    { id: "SceneBG3", src: "../../Assets/images/allScene3.png" },
    { id: "Chuck", src: "../../Assets/images/chuck.png" },
    { id: "Ark", src: "../../Assets/images/ark.png" },
    { id: "atlas", src: "../../Assets/images/atlas.png" },
    { id: "theme", src: "../../Assets/audio/POL-mazy-jungle-short.wav" },
    { id: "Woosh", src: "../../Assets/audio/woosh.mp3" },
    { id: "Boom", src: "../../Assets/audio/splosion.mp3" }
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
    createjs.Sound.play("theme", 0, 0, 0, 1000);

    let atlasData = {
        "images": [
            assets.getResult("atlas")
        ],
        "frames": [
            [340,0,107,123, 0, 0, 0],
            [75,0,85,98, 0, 0, 0],
            [250,0,90,97, 0, 0, 0],
            [560,0,113,121, 0, 0, 0],
            [791,123,113,121, 0, 0, 0],
            [452,123,113,121,0,0,0],
            [113,123,113,121,0,0,0],
            [447,0,113,121,0,0,0],
            [673,0,113,121,0,0,0],
            [0,123,113,121,0,0,0],
            [786,0,113,121,0,0,0],
            [899,0,113,121,0,0,0],
            [226,123,113,121,0,0,0],
            [339,123,113,121,0,0,0],
            [565,123,113,121,0,0,0],
            [904,123,113,121,0,0,0],
            [678,123,113,121,0,0,0],
            [160,0,89,100,0,0,0],
            [0,0,75,100,0,0,0]            
        ],
        "animations": {
            "ChuckS": { "frames": [0] },
            "Colonist": { "frames": [1] },
            "Cowboy": { "frames": [2] },
            "Explode": { "frames": [3,4,5,6,7,8,9,10,11,12,13,14,15,16], "speed": 0.5 },
            "Target": { "frames": [17] },
            "Tomahawk": { "frames": [18] }
        },
    }

    atlas = new createjs.SpriteSheet(atlasData);

    scene = config.Scene.MENU;
    changeScene();
}

function gameLoop(event: createjs.Event): void {
    // Update whatever scene is currently active.
    currentScene.update();
    stage.update();
}

function changeScene(): void {

    // Simple state machine pattern to define scene swapping.
    switch (scene) {
        case config.Scene.MENU:
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
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