import {ViewPort} from "./ViewPort.js";

import {GlobalConfig, loader} from "./Configuration.js";

import {BulletSpritesPool} from "./spritePool/bulletSpritePool.js";
import {PlayerSpritesPool} from "./spritePool/playerSpritePool.js";
import {EnemySpritesPool} from "./spritePool/enemySpritePool.js";
import {BackgroundSpritesPool} from "./spritePool/backgroundSpritePool.js";
import {FloorThinSpritesPool} from "./spritePool/floorThinSpritePool.js";
import {BigBrickSpritesPool} from "./spritePool/bigBrickSpritePool.js";
import {CoinSpritesPool} from "./spritePool/coinSpritePool.js";
import {FloorWTreeSpritesPool} from "./spritePool/FloorWTreeSpritePool.js";
import {CoinStateEnum, EnemyStateEnum, GenericStateEnum, PlayerStateEnum} from "./GeneralEnums.js";

//Define any variables that are used in more than one function

let viewPort,pixiRenderer, stage;
let selectedSprite, genId=0;
let bulletSpritePool, playerSpritePool, enemiesSpritePool,backgroundSpritePool,floorThinSpritePool,bigBrickSpritePool,coinSpritePool,floorWTreeSpritePool;

function initSpritePools(){
    //bullet sprite pool init
    bulletSpritePool =  new BulletSpritesPool();
    //player sprite pool init
    playerSpritePool =  new PlayerSpritesPool(1);
    //enemy sprite pool init
    enemiesSpritePool =  new EnemySpritesPool(100);
    //background sprites pool
    backgroundSpritePool = new BackgroundSpritesPool(1);
    //floor thin sprites pool
    floorThinSpritePool = new FloorThinSpritesPool(200);
    //bigbrick sprites pool
    bigBrickSpritePool = new BigBrickSpritesPool(200);
    //coin sprites pool
    coinSpritePool = new CoinSpritesPool(300);
    //floor w tree sprites pool
    floorWTreeSpritePool = new FloorWTreeSpritesPool(100);
}

function keyBindings(){
    document.addEventListener("keypress", keyCommands);


}
function keyCommands(event) {
    console.log(event);
    if(event.code === "KeyD"){ //move viewport left
        viewPort.offset.x += 10;
        for(let i=0;i<stage.children.length;i++){
            stage.children[i].position.x -= 10;
        }
    }
    if(event.code === "KeyA"){//move viewport right
        viewPort.offset.x -= 10;
        for(let i=0;i<stage.children.length;i++){
            stage.children[i].position.x += 10;
        }
    }
    if(event.code === "KeyC") { //add sprite to the scene
        //add to the scene a new sprite
        let sprite = generateSpriteOf($("#typeInput")[0].value);
        stage.addChild(sprite);

    }
}

function main() {
    //Add the canvas that Pixi automatically created for you to the HTML document
    //document.body.appendChild(pixiApp.view); not neccesary because I created the canvas manually
    loader
        .add("images/game/game.json")
        .load(setup);

}

function setup() {
    $("#importBtn")[0].onclick =onImportButtonClick;
    $("#exportBtn")[0].onclick =onExportButtonClick;
    $("#moveBackBtn")[0].onclick =onSendBackButtonClick;

    initSpritePools();
    keyBindings();

    //global viewport set
    viewPort = new ViewPort({width:GlobalConfig.viewport.width, height:GlobalConfig.viewport.height});
    // setup renderer and stage
    pixiRenderer= new PIXI.Renderer({ width: GlobalConfig.viewport.width, height: GlobalConfig.viewport.height, backgroundColor: 0xA3ECEE, view: $("#secondCanv")[0],  antialiasing: true,});
    stage = new PIXI.Container();

   requestAnimationFrame(gameLoop);
}

function gameLoop(delta) {
    //render to canvas
    pixiRenderer.render(stage);

    requestAnimationFrame(gameLoop);
     // debugGetFPS();

}


function configSpriteDrag(sprite) {
    // enable the bunny to be interactive... this will allow it to respond to mouse and touch events
    sprite.interactive = true;

    // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
    sprite.buttonMode = true;

    // setup events
    sprite
        // events for drag start
        .on('mousedown', onDragStart)
        .on('touchstart', onDragStart)
        // events for drag end
        .on('mouseup', onDragEnd)
        .on('mouseupoutside', onDragEnd)
        .on('touchend', onDragEnd)
        .on('touchendoutside', onDragEnd)
        // events for drag move
        .on('mousemove', onDragMove)
        .on('touchmove', onDragMove)
        .on('click', onClickSprite);

}

/**
 *
 * @param spritetype
 * @param realx optional
 * @param realy optional
 * @returns {*}
 */
function generateSpriteOf(spritetype, realx, realy) {
    let sprite;
    if(spritetype === GlobalConfig.entities.player.type){
        sprite = playerSpritePool.borrowSpriteWithState(PlayerStateEnum.MOVE_RIGHT);
    } else  if(spritetype === GlobalConfig.entities.coin.type){
        sprite = coinSpritePool.borrowSpriteWithState(CoinStateEnum.ROTATE);
    } else  if(spritetype === GlobalConfig.entities.floorThin.type){
        sprite = floorThinSpritePool.borrowSpriteWithState(GenericStateEnum.DEFAULT);
    } else  if(spritetype === GlobalConfig.entities.floorWTree.type){
        sprite = floorWTreeSpritePool.borrowSpriteWithState(GenericStateEnum.DEFAULT);
    } else  if(spritetype === GlobalConfig.entities.enemy.type){
        sprite = enemiesSpritePool.borrowSpriteWithState(EnemyStateEnum.MOVE_RIGHT);
    } else  if(spritetype === GlobalConfig.entities.bigBrick.type){
        sprite = bigBrickSpritePool.borrowSpriteWithState(GenericStateEnum.DEFAULT);
    } else  if(spritetype === GlobalConfig.entities.background.type){
        sprite = backgroundSpritePool.borrowSpriteWithState(GenericStateEnum.DEFAULT);
    }

    configSpriteDrag(sprite);
    sprite.customId = genId;
    genId++;
    sprite.customType = spritetype;
    // move the sprite to its designated position
    if(realx === undefined || realy === undefined) {
        sprite.position.x = GlobalConfig.viewport.width / 2;
        sprite.position.y = GlobalConfig.viewport.height / 2;
        sprite.position.realx = GlobalConfig.viewport.width / 2 + viewPort.offset.x;
        sprite.position.realy = GlobalConfig.viewport.height / 2;
    }else{
        sprite.position.x = realx - viewPort.offset.x;
        sprite.position.y = realy;
        sprite.position.realx = realx;
        sprite.position.realy = realy;
    }
    return sprite;
}

function onSendBackButtonClick(event)
{
   for(let i=0;i<stage.children.length;i++) {
       if(stage.children[i].customId === selectedSprite.customId) {
           //swap
           let temp = stage.children[i-1];
           stage.children[i-1] = stage.children[i];
           stage.children[i] = temp;
       }
   }
}
function onImportButtonClick(event)
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
           let sprite = generateSpriteOf(parsedMap.elements[i].type, parsedMap.elements[i].x, parsedMap.elements[i].y);
            stage.addChild(sprite);
        }
    };
    reader.readAsText(file);
}

function onExportButtonClick(event)
{
    let result = {};
    result.mapSize =  viewPort.size;
    result.elements = [];
    for(let i=0;i<stage.children.length;i++) {
        let element = {};
        element.type  = stage.children[i].customType;
        element.index = i;
        element.x = stage.children[i].position.realx;
        element.y = stage.children[i].position.realy;
        result.elements.push(element);
    }
    let resultJSON = JSON.stringify(result);
    save("map.json", resultJSON);
}

function save(filename, data) {
    let blob = new Blob([data], {type: 'text/csv'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

//display info of the sprite when click
function onClickSprite(event)
{
    selectedSprite = event.target;
    $("#worldxInput")[0].value = event.target.position.realx;
    $("#worldyInput")[0].value = event.target.position.realy;
}

function onDragStart(event)
{
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
}

function onDragEnd()
{
    this.alpha = 1;

    this.dragging = false;

    // set the interaction data to null
    this.data = null;
}

function onDragMove()
{
    if (this.dragging)
    {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;

        this.position.realx = newPosition.x + viewPort.offset.x;
        this.position.realy = newPosition.y;
    }
}

$(document).ready(function () {
    main();
});