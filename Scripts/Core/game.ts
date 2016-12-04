/// <reference path = "_reference.ts" />

//COMP397 Final Assignment Pt1
//Jamie Kennedy - 300753196
//December 3, 2016

// Global Variables
var assets: createjs.LoadQueue;
var canvas: HTMLElement;
var stage: createjs.Stage;

var spriteSheetLoader : createjs.SpriteSheetLoader;
var atlas : createjs.SpriteSheet;

var currentScene : objects.Scene;
var scene: number;

// Preload Assets required
var assetData:objects.Asset[] = [
    {id: "BG", src: "../../Assets/images/bg.png"},
    {id: "Title", src: "../../Assets/images/title.png"},
    {id: "PlayBtn", src: "../../Assets/images/playBtn.png"},
    {id: "InstructionsBtn", src: "../../Assets/images/instructionsBtn.png"},
    {id: "SceneBG", src: "../../Assets/images/allScene.png"},
    {id: "Floor", src: "../../Assets/images/floor.png"},
    {id: "atlas", src: "../../Assets/images/atlas.png"},
    {id: "theme", src: "../../Assets/audio/main_theme.mp3"}
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

    let atlasData = {
        "images": [
            assets.getResult("atlas")
        ],
        "frames":[
            [0,0,107,123,0,0,0],
            [107,0,85,98,0,0,0],
            [192,0,91,97,0,0,0],
            [283,0,89,100,0,0,0],
            [372,0,75,100,0,0,0]
        ],
        "animations":{
            "Chuck" : { "frames" : [0]},
            "Colonist" : { "frames" : [1]},
            "Cowboy" : { "frames" : [2]},
            "Target" : { "frames" : [3]},
            "Tomahawk" : { "frames" : [4]}
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

function changeScene() : void {
    
    // Simple state machine pattern to define scene swapping.
    switch(scene)
    {
        case config.Scene.MENU :
            stage.removeAllChildren();
            currentScene = new scenes.Menu();;
            console.log("Starting MENU scene");
            break;
        case config.Scene.GAME :
            stage.removeAllChildren();
            currentScene = new scenes.Play();
            console.log("Starting PLAY scene");
            break;
    }
    
}