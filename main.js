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
let  wallSprite, groundSprite;//Sprites

//let myBulletEntities =  [];
let entitiesManager;
let backSprite;

let ground, wall;
let pixiApp;
let engine;
let graphicsSystem, inputSystem;

let viewPort = new ViewPort({width:1200, height:500});

let fpsText;
function main() {
    //create entities manager
    entitiesManager = new EntitiesManager();

    //MatterJs stuff
    createMatterModel();

    ////PIXIJs stuff
    createPixiModel();

    //debug fps
    fpsText = new PIXI.Text('',{fill:'red'});
    fpsText.x = 200;
    fpsText.y = 10;

    pixiApp.stage.addChild(fpsText);
    setInterval(function(){
        fpsText.text = "FPS: " + Math.round(pixiApp.ticker.FPS);
    },400);
}

function createPixiModel() {
    //Create a Pixi Application
    pixiApp = new Application({
        width: 1200,
        height: 500,
        antialiasing: true,
        transparent: false,
        resolution: 1,
        view: $("#secondCanv")[0] //custom canvas
    });

    pixiApp.renderer.backgroundColor = 0xA3ECEE;


    //Add the canvas that Pixi automatically created for you to the HTML document
    //document.body.appendChild(pixiApp.view); not neccesary because I created the canvas manually
   // PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
    loader
        .add("images/bullet.png")
        .add("images/textures/rock01.jpg")
        .add("images/textures/rock02.jpg")
        .add("images/game/game.json")
        .load(setup);

}



function setup() {


    entitiesManager.addBackgroundEntity(new BackgroundEntity());

    //create graphics system
    graphicsSystem = new GraphicsSystem(pixiApp.stage, entitiesManager, viewPort);

    //input system create
    inputSystem = new InputSystem(entitiesManager,engine);


    //walll
    //Create the `wall` sprite
    wallSprite = new TilingSprite(resources["images/textures/rock01.jpg"].texture,1024,1024);
    pixiApp.stage.addChild(wallSprite);

    wallSprite.width =100;
    wallSprite.height = 60;
    wallSprite.tilePosition.x = 0;
    wallSprite.tilePosition.y = 0;
    wallSprite.anchor.x = 0.5;
    wallSprite.anchor.y = 0.5;

    //wfloor
    //Create the `wall` sprite
    groundSprite = new TilingSprite(resources["images/textures/rock02.jpg"].texture,1024,1024);
    pixiApp.stage.addChild(groundSprite);

    groundSprite.width =600;
    groundSprite.height = 60;
    groundSprite.tilePosition.x = 0;
    groundSprite.tilePosition.y = 0;
    groundSprite.anchor.x = 0.5;
    groundSprite.anchor.y = 0.5;


    //Start the game loop by adding the `gameLoop` function to
    //Pixi's `ticker` and providing it with a `delta` argument.
    //Any functions added to the `ticker` will be called 60 times per second.
    //This means that the `gameLoop` function (defined in the code ahead) will be updated
    //60 times per second. 
    pixiApp.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

    graphicsSystem.update();
    inputSystem.update();

    //update wall position
    wallSprite.x = wall.position.x-viewPort.offset.x;
    wallSprite.y = wall.position.y;
    wallSprite.rotation = wall.angle;

    //update ground position
    groundSprite.x = ground.position.x-viewPort.offset.x;
    groundSprite.y = ground.position.y;
    groundSprite.rotation = ground.angle;

}


function createMatterModel() {

    // create an engine
    engine = Engine.create();
    var world = engine.world;

    engine.world.gravity.y = 0.5;

    // create a renderer
    var render = Render.create({
        element: document.body,
        options: {
            width: 1200,
            height: 600
        },
        engine: engine
    });

    //dynamic floor
    for(let i=0;i<50;i++) {

        let floor;
        if(Math.random()>0) {
            floor = Bodies.rectangle(650 + i * 64, 500, 64, 128, {isStatic: true, friction: 0}); //436
        }else{
            floor = Bodies.rectangle(650 + i * 64, 436, 64, 128, {isStatic: true, friction: 0});
        }
        floorEntity = new FloorEntity();
        floorEntity.body = floor;
        entitiesManager.addFloorEntity(floorEntity);
        World.add(engine.world, floorEntity.body);
    }
    // create two boxes and a ground
    let monster = Bodies.rectangle(410, 300, 64, 64);
    Body.setInertia(monster, Infinity);//lock rotation for dude
    enemyEntity = new EnemyEntity();
    enemyEntity.body = monster;
    enemyEntity.body.customType = "ENEMY";
    enemyEntity.selfMovement = new MovementComponent(engine);

    entitiesManager.addEnemyEntity(enemyEntity);

    let player = Bodies.rectangle(170, 350, 72,72, { restitution: 0, friction: 0,frictionAir: 0, frictionStatic: 0});
    Body.setInertia(player, Infinity);//lock rotation for dude

    //player entity
    playerEntity = new PlayerEntity();
    playerEntity.body = player;
    playerEntity.body.customType ="PLAYER";
    entitiesManager.addPlayerEntity(playerEntity);

    ground = Bodies.rectangle(300, 470, 600, 60, { isStatic: true });
    wall = Bodies.rectangle(50, 300, 100, 60, { isStatic: true , friction: 0.3 });

    //disable gravity for objects in noGravity List
    Events.on(engine, 'beforeUpdate', function() {
        //entities that self move
        for (let entity of entitiesManager.getEntitiesWithSelfMovementAndBodyComponent()) {
            entity.selfMovement.move(entity.body);
        }
        //entities that avoid gravity
        var gravity = engine.world.gravity;
        for (let noGravityBody of entitiesManager.getBulletEntities()) {
                Body.applyForce(noGravityBody.body, noGravityBody.body.position, {
                    x: -gravity.x * gravity.scale * noGravityBody.body.mass,
                    y: -gravity.y * gravity.scale * noGravityBody.body.mass
                });
        }

    });
    // Event listener: collision bullet
    Matter.Events.on(engine, 'collisionStart', function(event) {//collisionEnd
        // We know there was a collision so fetch involved elements ...
        let aElm = event.pairs[0].bodyA;
        let bElm = event.pairs[0].bodyB;

        if(aElm.customType=='BULLET'){
            // World.remove(world,aElm);
           // aElm.toDelete=true;
            removeBulletBodyFromentitiesList(entitiesManager.getBulletEntities(), aElm.id);

        }

        if(bElm.customType=='BULLET'){
            //World.remove(world,bElm);
            //bElm.toDelete=true;
            removeBulletBodyFromentitiesList(entitiesManager.getBulletEntities(), bElm.id);
        }

        if((aElm.customType=='ENEMY'  && bElm.customType=='PLAYER')||(bElm.customType=='ENEMY'  && aElm.customType=='PLAYER')){

            // engine.timing.timeScale = 0;//this pauses the engine
            console.log("YOu DIeD!")
        }
        // Now do something with the event and elements ... your task ;-)
    });

    // add all of the bodies to the world
    World.add(engine.world, [monster, player, ground, wall]);

    // run the engine
    Engine.run(engine);

    //engine.timing.timeScale = 0;//this pauses the engine
    // run the renderer
   // Render.run(render);

    //some log
    // setInterval(function () {
    //     console.log(player.velocity.x);
    // }, 100);

    // add mouse control
    var mouse = Mouse.create($("#secondCanv")[0]);
    mouse.offset = viewPort.offset;//todo: kind of hack, but works
    var mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);
    // keep the mouse in sync with rendering
    render.mouse = mouse;
}

function removeBulletBodyFromentitiesList(listEntities, bodyId){
    for(let i=listEntities.length-1;i>=0;i--){//move this inside bullet entity
        if(listEntities[i].body.id==bodyId){
            if(listEntities[i].sprite) {//not undefined
                pixiApp.stage.removeChild(listEntities[i].sprite);
                myBulletSpritePool.returnSprite(listEntities[i].sprite);
            }
            World.remove(engine.world,listEntities[i].body);
            listEntities.splice(i,1);
        }
    }
}

$(document).ready(function () {
    main();
});