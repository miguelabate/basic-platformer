let GlobalConfig = {};

GlobalConfig.viewport = {
    width:960,
    height:540,// ratio 16:9
    stride:500, //how much in pixels the viewpoert moves when the player approaches the border of the screen
    borderLimit:200, //how close the player can get to any border before it starts to scroll
    backgroundSpeed:0.128,
    foreGroundSpeed:3
    };

GlobalConfig.physics = {
    gravity:1.7,
    bulletSpeed:8
};

GlobalConfig.entities = {};
GlobalConfig.entities.player = {
    type:"PLAYER",
    width:72,
    height:72
};
GlobalConfig.entities.bigBrick = {
    type:"BIGBRICK",
    width:64,
    height:64
};
GlobalConfig.entities.bullet = {
    type:"BULLET",
    width:12,
    height:12
};
GlobalConfig.entities.coin = {
    type:"COIN",
    width:32,
    height:32
};
GlobalConfig.entities.enemy = {
    type:"ENEMY",
    width:64,
    height:64
};
GlobalConfig.entities.floorThin = {
    type:"FLOOR",
    width:64,
    height:128
};
GlobalConfig.entities.background = {
    type:"BACKGROUND",
    width:GlobalConfig.viewport.width,
    height:GlobalConfig.viewport.height
};