
//Define any variables that are used in more than one function

import {GraphicsSystem} from "./system/graphicsSystem.js";
import {BodyFactory} from "./BodyFactory.js";
import {WorldStateService} from "./WorldStateService.js";
import {PhysicsSystem} from "./system/physicsSystem.js";
import {ViewPort} from "./ViewPort.js";
import {EntitiesManager} from "./EntitiesManager.js";
import {GameStateService} from "./GameStateService.js";
import {InputSystem} from "./system/inputSystem.js";
import {MaintenanceSystem} from "./system/maintenanceSystem.js";
import {StateSystem} from "./system/stateSystem.js";
import {ConditionCheckSystem} from "./system/ConditionCheckSystem.js";
import {GlobalConfig, loader, Render, Mouse, MouseConstraint, World} from "./Configuration.js";
import {PlayerEntity} from "./entity/playerEntity.js";
import {CoinEntity} from "./entity/coinEntity.js";
import {FloorEntity} from "./entity/floorEntity.js";
import {FloorWTreeEntity} from "./entity/FloorWTreeEntity.js";
import {EnemyEntity} from "./entity/enemyEntity.js";
import {EnemyMovementComponent} from "./component/enemyMovementComponent.js";
import {BigBrickEntity} from "./entity/bigBrickEntity.js";
import {BackgroundEntity} from "./entity/backgroundEntity.js";


let entitiesManager;

let runner;

let graphicsSystem, inputSystem, physicsSystem, maintenanceSystem, stateSystem, conditionCheckSystem;

export let viewPort;
export let bodyFactory;

let oldTime;
let myWorldStateService, myGameStateService;

function main() {
    //Add the canvas that Pixi automatically created for you to the HTML document
    //document.body.appendChild(pixiApp.view); not neccesary because I created the canvas manually
    loader
        .add("images/game/game.json")
        .load(setup);

}

function setup() {
    $("#importBtn")[0].onclick =onImportButtonClick;

    //global viewport set
    viewPort = new ViewPort({width:GlobalConfig.viewport.width, height:GlobalConfig.viewport.height});
    //body factiry
    bodyFactory = new BodyFactory();
    //create entities manager
    entitiesManager = new EntitiesManager();
    //world state service
    myWorldStateService = new WorldStateService(entitiesManager);
    //world state service
    myGameStateService = new GameStateService();

    //create graphics system
    graphicsSystem = new GraphicsSystem( entitiesManager);
    //physics system create
    physicsSystem = new PhysicsSystem(entitiesManager, myWorldStateService);
    //input system create
    inputSystem = new InputSystem(entitiesManager, myWorldStateService);
    //maintenance system
    maintenanceSystem = new MaintenanceSystem(entitiesManager);
    //state system
    stateSystem = new StateSystem(entitiesManager, myWorldStateService);
    //condition check system
    conditionCheckSystem = new ConditionCheckSystem(entitiesManager, myWorldStateService, myGameStateService)
    //MatterJs stuff
    addDebugRendererForMatterJs();

    // entitiesManager.addBackgroundEntity(new BackgroundEntity());

    //for deltas time
    oldTime = performance.now();
    myGameStateService.setGameIsPlaying(false);

   requestAnimationFrame(gameLoop);
}

function gameLoop(delta) {

    if(myGameStateService.getGameIsPlaying()) {

        let newTime = performance.now();
        let deltaTime = newTime - oldTime;
        oldTime = newTime;
        // lag += deltaTime;

        inputSystem.update(deltaTime);

        physicsSystem.update(deltaTime);

        stateSystem.update();

        //update graphics and render
        graphicsSystem.update();

        conditionCheckSystem.update();

        //clean up stuff
        maintenanceSystem.update();
    }
    requestAnimationFrame(gameLoop);
     // debugGetFPS();

}

function debugGetFPS(){
    if(!this.startTime){
        this.startTime =new Date();
        this.frameCount=0;
    }
    this.frameCount++;
    this.fps=(this.frameCount/(new Date().getTime()-this.startTime.getTime()))*1000;

}
function addDebugRendererForMatterJs() {

    // create a renderer
    var render = Render.create({
        element: document.body,
        options: {
            width: GlobalConfig.viewport.width,
            height: GlobalConfig.viewport.height
        },
        engine: physicsSystem.engine
    });

    // run the renderer
   Render.run(render);

    // add mouse control
    var mouse = Mouse.create($("#secondCanv")[0]);
    mouse.offset = viewPort.offset;//todo: kind of hack, but works
    var mouseConstraint = MouseConstraint.create(physicsSystem.engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(physicsSystem.engine.world, mouseConstraint);
    // keep the mouse in sync with rendering
    // render.mouse = mouse;
}

export function onImportButtonClick(event)
{
    let file = $("#file-input-import")[0].files[0];
    if (!file) {
        return;
    }
    let reader = new FileReader();
    reader.onload = function(e) {
        let contents = e.target.result;
        console.log(contents);
        let parsedMap = JSON.parse(contents);
        //create elements
        for(let i=0;i<parsedMap.elements.length;i++){
            generateEntity(parsedMap.elements[i].type, parsedMap.elements[i].x, parsedMap.elements[i].y);

        }

        //run it
        myGameStateService.setGameIsPlaying(true);
    };
    reader.readAsText(file);


}

function generateEntity(type, realx, realy) {
    if(type === GlobalConfig.entities.player.type){
        let playerEntity = new PlayerEntity();
        playerEntity.body =  bodyFactory.createPlayer(realx, realy);
        World.add(physicsSystem.engine.world, playerEntity.body );
        entitiesManager.addPlayerEntity(playerEntity);
    } else  if(type === GlobalConfig.entities.coin.type){
        let coinEntity = new CoinEntity();
        coinEntity.body =  bodyFactory.createCoin(realx, realy);
        entitiesManager.addCoinEntity(coinEntity);
        World.add(physicsSystem.engine.world, coinEntity.body );
    } else  if(type === GlobalConfig.entities.floorThin.type){
        let floorEntity = new FloorEntity();
        floorEntity.body =  bodyFactory.createFloorThin(realx,realy);
        entitiesManager.addFloorEntity(floorEntity);
        World.add(physicsSystem.engine.world, floorEntity.body);
    } else  if(type === GlobalConfig.entities.floorWTree.type){
        let floorWTreeEntity = new FloorWTreeEntity();
        floorWTreeEntity.body =  bodyFactory.createFloorWTree(realx,realy);
        entitiesManager.addFloorWTreeEntity(floorWTreeEntity);
        World.add(physicsSystem.engine.world, floorWTreeEntity.body);
    } else  if(type === GlobalConfig.entities.enemy.type){
        let enemyEntity = new EnemyEntity();
        enemyEntity.body =  bodyFactory.createEnemy(realx, realy);;
        enemyEntity.selfMovement = new EnemyMovementComponent();
        World.add(physicsSystem.engine.world, enemyEntity.body );
        entitiesManager.addEnemyEntity(enemyEntity);
    } else  if(type === GlobalConfig.entities.bigBrick.type){
        let bigBrickEntity = new BigBrickEntity();
        bigBrickEntity.body = bodyFactory.createBigBrick(realx, realy);
        entitiesManager.addBigBrickEntity(bigBrickEntity);
        World.add(physicsSystem.engine.world, bigBrickEntity.body );
    } else  if(type === GlobalConfig.entities.background.type){
        entitiesManager.addBackgroundEntity(new BackgroundEntity());
    }

}

$(document).ready(function () {
    main();
});