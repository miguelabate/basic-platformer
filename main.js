// aliases for Matter
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Mouse = Matter.Mouse,
    Events = Matter.Events,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Body = Matter.Body;
Bodies = Matter.Bodies;

//Aliases for PIXI
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader =PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle,
    Sprite = PIXI.Sprite,
    TilingSprite = PIXI.TilingSprite;

//Define any variables that are used in more than one function

let entitiesManager;

let runner;

let graphicsSystem, inputSystem, physicsSystem, maintenanceSystem, stateSystem, conditionCheckSystem;

let viewPort;

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
    //global viewport set
    viewPort = new ViewPort({width:GlobalConfig.viewport.width, height:GlobalConfig.viewport.height});
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
    createMatterModel();

    entitiesManager.addBackgroundEntity(new BackgroundEntity());

    //for deltas time
    oldTime = performance.now();

   requestAnimationFrame(gameLoop);
}

function gameLoop(delta) {

    if(!myGameStateService.getGameIsPlaying()) return;//game ended

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
function createMatterModel() {

    // create a renderer
    var render = Render.create({
        element: document.body,
        options: {
            width: GlobalConfig.viewport.width,
            height: GlobalConfig.viewport.height
        },
        engine: physicsSystem.engine
    });

    //floor w tree
    let floorWTreeBody = BodyFactory.createFloorWTree(404,468);
    let floorWTreeEntity = new FloorWTreeEntity();
    floorWTreeEntity.body = floorWTreeBody;
    floorWTreeEntity.viewPort = viewPort;
    entitiesManager.addFloorWTreeEntity(floorWTreeEntity);
    World.add(physicsSystem.engine.world, floorWTreeEntity.body);

    //dynamic floor
    for(let i=0;i<10;i++) {

        let floor;
        if(Math.random()>0.2) {
            floor = BodyFactory.createFloorThin(-300 + i * 64,500);
        }else{
            floor = BodyFactory.createFloorThin(-300 + i * 64,436);
        }
        let floorEntity = new FloorEntity();
        floorEntity.body = floor;
        floorEntity.viewPort = viewPort;
        entitiesManager.addFloorEntity(floorEntity);
        World.add(physicsSystem.engine.world, floorEntity.body);
    }
    // eney entity spawner
    setInterval(function(){
        let enemyEntity = new EnemyEntity();
        enemyEntity.body =  BodyFactory.createEnemy(600, 100);;
        enemyEntity.viewPort = viewPort;
        enemyEntity.selfMovement = new EnemyMovementComponent();
        World.add(physicsSystem.engine.world, enemyEntity.body );
        entitiesManager.addEnemyEntity(enemyEntity);
        }, 4000);


    //player entity
    let playerEntity = new PlayerEntity();
    playerEntity.body =  BodyFactory.createPlayer(170, 350);
    playerEntity.viewPort = viewPort;
    World.add(physicsSystem.engine.world, playerEntity.body );
    entitiesManager.addPlayerEntity(playerEntity);

    // bigbrick
    let bigbrick = BodyFactory.createBigBrick(GlobalConfig.entities.bigBrick.width/2, 250);
    let bigBrickEntity = new BigBrickEntity();
    bigBrickEntity.body = bigbrick;
    bigBrickEntity.viewPort = viewPort;
    entitiesManager.addBigBrickEntity(bigBrickEntity);
    World.add(physicsSystem.engine.world, bigBrickEntity.body );

    //some coin
    for(let i=0;i<5;i++) {
        let coinEntity = new CoinEntity();
        coinEntity.body =  BodyFactory.createCoin(250+i*100, 300);
        coinEntity.viewPort = viewPort;
        entitiesManager.addCoinEntity(coinEntity);
        World.add(physicsSystem.engine.world, coinEntity.body );
    }

    //engine.timing.timeScale = 0;//this pauses the engine
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



$(document).ready(function () {
    main();
});