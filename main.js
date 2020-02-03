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

let engine;
let runner;

let graphicsSystem, inputSystem, physicsSystem,maintenanceSystem, stateSystem;

let viewPort = new ViewPort({width:1200, height:500});

let oldTime;

function main() {
    //Add the canvas that Pixi automatically created for you to the HTML document
    //document.body.appendChild(pixiApp.view); not neccesary because I created the canvas manually
    loader
        .add("images/game/game.json")
        .load(setup);

}

function setup() {
    //create entities manager
    entitiesManager = new EntitiesManager();

    //create graphics system
    graphicsSystem = new GraphicsSystem( entitiesManager);
    //physics system create
    physicsSystem = new PhysicsSystem(entitiesManager);
    //input system create
    inputSystem = new InputSystem(entitiesManager,physicsSystem.engine,viewPort);
    //maintenance system
    maintenanceSystem = new MaintenanceSystem(entitiesManager);
    //state system
    stateSystem = new StateSystem((entitiesManager));
    //MatterJs stuff
    createMatterModel();

    entitiesManager.addBackgroundEntity(new BackgroundEntity());

    //for deltas time
    oldTime = performance.now();

   requestAnimationFrame(gameLoop);
}

function gameLoop(delta) {
    let newTime = performance.now();
    let deltaTime = newTime - oldTime;
    oldTime = newTime;
    // lag += deltaTime;

    inputSystem.update(deltaTime);

    physicsSystem.update(deltaTime);

    stateSystem.update();

    //update graphics and render
    graphicsSystem.update();

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
            width: 1200,
            height: 600
        },
        engine: physicsSystem.engine
    });

    //dynamic floor
    for(let i=0;i<50;i++) {

        let floor;
        if(Math.random()>0.2) {
            floor = Bodies.rectangle(-300 + i * 64, 500, 64, 128, {isStatic: true, friction: 0}); //436
        }else{
            floor = Bodies.rectangle(-300 + i * 64, 436, 64, 128, {isStatic: true, friction: 0});
        }
        let floorEntity = new FloorEntity();
        floorEntity.body = floor;
        floorEntity.viewPort = viewPort;
        entitiesManager.addFloorEntity(floorEntity);
        World.add(physicsSystem.engine.world, floorEntity.body);
    }
    // create two boxes and a ground
    let monster = Bodies.rectangle(600, 300, 64, 64);
    Body.setInertia(monster, Infinity);//lock rotation for dude
    let enemyEntity = new EnemyEntity();
    enemyEntity.body = monster;
    enemyEntity.viewPort = viewPort;
    enemyEntity.body.customType = "ENEMY";
    enemyEntity.selfMovement = new EnemyMovementComponent();

    entitiesManager.addEnemyEntity(enemyEntity);

    let player = Bodies.rectangle(170, 350, 72,72, { restitution: 0, friction: 0,frictionAir: 0, frictionStatic: 0});
    Body.setInertia(player, Infinity);//lock rotation for dude

    //player entity
    let playerEntity = new PlayerEntity();
    playerEntity.body = player;
    playerEntity.viewPort = viewPort;
    playerEntity.body.customType ="PLAYER";
    entitiesManager.addPlayerEntity(playerEntity);

    // bigbrick
    let bigbrick = Bodies.rectangle(50, 300, 64, 64, { isStatic: true , friction: 0.3 });
    let bigBrickEntity = new BigBrickEntity();
    bigBrickEntity.body = bigbrick;
    bigBrickEntity.viewPort = viewPort;
    bigBrickEntity.body.customType = "BIGBRICK";
    entitiesManager.addBigBrickEntity(bigBrickEntity);

    //some coin
    for(let i=0;i<5;i++) {
        let coin = Bodies.rectangle(250+i*100, 300, 32, 32, {isStatic: true, isSensor: true});
        Body.setInertia(coin, Infinity);//lock rotation for dude
        let coinEntity = new CoinEntity();
        coinEntity.body = coin;
        coinEntity.viewPort = viewPort;
        coinEntity.body.customType = "COIN";
        entitiesManager.addCoinEntity(coinEntity);
        World.add(physicsSystem.engine.world, coin);
    }

    // add all of the bodies to the world
    World.add(physicsSystem.engine.world, [monster, player, bigbrick]);

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