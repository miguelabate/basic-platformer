/**
 * Define a factory Object to create the different body types
 */
let BodyFactory = {};

/**
 * Creates the standar bullet
 * @param x
 * @param y
 * @returns {body}
 */
BodyFactory.createBullet = function(x, y){
    let body = Bodies.rectangle(x, y, GlobalConfig.entities.bullet.width, GlobalConfig.entities.bullet.height, {
        restitution: 0,
        friction: 0,
        frictionAir: 0,
        collisionFilter:{group:-2}
    });
    body.customType = GlobalConfig.entities.bullet.type;
    return body;
};

BodyFactory.createFloorThin = function(x, y){
    let body =  Bodies.rectangle(x, y, GlobalConfig.entities.floorThin.width, GlobalConfig.entities.floorThin.height, {isStatic: true, friction: 0});
    body.customType = GlobalConfig.entities.floorThin.type;
    return body;
};

BodyFactory.createPlayer = function(x, y){
    let body =   Bodies.rectangle(x, y, GlobalConfig.entities.player.width,GlobalConfig.entities.player.height, { restitution: 0, friction: 0,frictionAir: 0, frictionStatic: 0 });
    Body.setInertia(body, Infinity);//lock rotation for dude
    body.customType =GlobalConfig.entities.player.type;
    return body;
};

BodyFactory.createEnemy = function(x, y){
    let body =  Bodies.rectangle(x, y, 64, 64, { collisionFilter:{group:-1}});
    Body.setInertia(body, Infinity);//lock rotation for dude
    body.customType = GlobalConfig.entities.enemy.type;
    return body;
};

BodyFactory.createCoin = function(x, y){
    let body =  Bodies.rectangle(x, y, 32, 32, {isStatic: true, isSensor: true , collisionFilter:{group:[-1,-2]}});
    body.customType = GlobalConfig.entities.coin.type;
    return body;
};

BodyFactory.createBigBrick = function(x, y){
    let body =  Bodies.rectangle(x,y,  GlobalConfig.entities.bigBrick.width, GlobalConfig.entities.bigBrick.height, { isStatic: true , friction: 0.3});
    body.customType = GlobalConfig.entities.bigBrick.type;
    return body;
};