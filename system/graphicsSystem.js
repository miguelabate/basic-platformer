/**
 * System that deals with sprites components. As other systems, READS/WRITES on sprites components but can only READ on other COMPONENT types
 */
class GraphicsSystem {

    stage = undefined;//pixi stage
    pixiRenderer = undefined;
    entitiesmanager = undefined;//entities manager

    bulletSpritePool = undefined;
    playerSpritePool = undefined;
    backgroundSpritePool = undefined;
    enemiesSpritePool = undefined;
    floorThinSpritePool = undefined;
    bigBrickSpritePool = undefined;
    coinSpritePool;

    keepSlidingViewPortLeft=false;
    keepSlidingViewPortRight=false;

    constructor(entitiesmanager) {
        // setup renderer and stage
        this.pixiRenderer= new PIXI.Renderer({ width: GlobalConfig.viewport.width, height: GlobalConfig.viewport.height, backgroundColor: 0xA3ECEE, view: $("#secondCanv")[0],  antialiasing: true,});
        this.stage = new PIXI.Container();

        this.entitiesmanager = entitiesmanager;

        //bullet sprite pool init
        this.bulletSpritePool =  new BulletSpritesPool();
        //bullet sprite pool init
        this.playerSpritePool =  new PlayerSpritesPool();
        //enemy sprite pool init
        this.enemiesSpritePool =  new EnemySpritesPool();
        //background sprites pool
        this.backgroundSpritePool = new BackgroundSpritesPool();
        //background sprites pool
        this.floorThinSpritePool = new FloorThinSpritesPool();
        //bigbrick sprites pool
        this.bigBrickSpritePool = new BigBrickSpritesPool();
        //coin sprites pool
        this.coinSpritePool = new CoinSpritesPool();
    }

    getSpritePoolFor(entity){
        if(entity.type===GlobalConfig.entities.bullet.type){
            return this.bulletSpritePool;
        } else if (entity.type===GlobalConfig.entities.player.type){
            return this.playerSpritePool;
        }  else if (entity.type===GlobalConfig.entities.enemy.type){
            return this.enemiesSpritePool;
        } else if (entity.type===GlobalConfig.entities.floorThin.type){
            return this.floorThinSpritePool;
        } else if (entity.type===GlobalConfig.entities.bigBrick.type){
            return this.bigBrickSpritePool;
        }else if (entity.type===GlobalConfig.entities.coin.type){
            return this.coinSpritePool;
        }else{
            console.log("Error fetching Sprite Pool for entity. Unrecognized type.");
        }
    }

    update() {
        //iterate enttities with body and sprite component, decide if need to draw them
        let entities = this.entitiesmanager.getEntitiesWithViewPortAndState();
        if (entities) {//needs to be there before doing anything
            for (let i = 0; i < entities.length; i++) {
                if (entities[i]) {
                    if (this.isVisible(entities[i])&&entities[i].state.getState()!==GenericStateEnum.TO_REMOVE) {
                        if (!entities[i].sprite) {
                            entities[i].sprite = this.getSpritePoolFor(entities[i]).borrowSpriteWithState(entities[i].state.getState());
                        }else if (entities[i].sprite.customState!==entities[i].state.getState()) {//the sprite needs to be updated with one int he correct state
                            this.stage.removeChild(entities[i].sprite);
                            this.getSpritePoolFor(entities[i]).returnSpriteWithState(entities[i].sprite,entities[i].sprite.customState);
                            entities[i].sprite = this.getSpritePoolFor(entities[i]).borrowSpriteWithState(entities[i].state.getState());
                        }

                        entities[i].sprite.x = entities[i].body.position.x - viewPort.offset.x;
                        entities[i].sprite.y = entities[i].body.position.y;
                        entities[i].sprite.rotation = entities[i].body.angle;

                        if (!entities[i].sprite.parent) {
                            this.stage.addChild(entities[i].sprite);
                        }

                    } else { //sprite not in viewport or TO_REMOVE, return it and take out of scene
                        if (entities[i].sprite) {//not undefined
                            this.stage.removeChild(entities[i].sprite);
                            this.getSpritePoolFor(entities[i]).returnSpriteWithState(entities[i].sprite,entities[i].sprite.customState);
                            entities[i].sprite = undefined;
                        }
                    }
                }
            }
        }

        /// background handling
        if (entitiesManager.getBackgroundEntities().length === 1 && !entitiesManager.getBackgroundEntities()[0].sprite) {
            let backSprite = this.backgroundSpritePool.borrowSprite();
            backSprite.x = GlobalConfig.viewport.width/2;
            backSprite.y = GlobalConfig.viewport.height/2;
            entitiesManager.getBackgroundEntities()[0].sprite = backSprite;

            this.stage.addChild(backSprite);
            this.stage.setChildIndex(backSprite, 0);
        }

        //move camera to follow player
        let playerX = entitiesManager.getPlayerEntities()[0].body.position.x;
        let playerY = entitiesManager.getPlayerEntities()[0].body.position.y;
        //for now only check center visibility
        if ((playerX < viewPort.offset.x +  GlobalConfig.viewport.borderLimit)||this.keepSlidingViewPortLeft) {//have two vars, one slide left one slide right
            this.keepSlidingViewPortLeft=true;
            viewPort.offset.x -= GlobalConfig.viewport.foreGroundSpeed;;
            entitiesManager.getBackgroundEntities()[0].sprite.tilePosition.x += GlobalConfig.viewport.backgroundSpeed;
            if(playerX > viewPort.offset.x + GlobalConfig.viewport.stride)  this.keepSlidingViewPortLeft=false;
        } else if ((playerX > viewPort.offset.x + viewPort.size.width - GlobalConfig.viewport.borderLimit)||this.keepSlidingViewPortRight) {
            this.keepSlidingViewPortRight=true;
            viewPort.offset.x += GlobalConfig.viewport.foreGroundSpeed;
            entitiesManager.getBackgroundEntities()[0].sprite.tilePosition.x -= GlobalConfig.viewport.backgroundSpeed;
            if( viewPort.offset.x + viewPort.size.width-playerX > GlobalConfig.viewport.stride) {
                this.keepSlidingViewPortRight=false;
            }
        }    //&& playerY  > viewPort.offset.y && playerY < viewPort.offset.y+viewPort.size.height;


        //render to canvas
        this.pixiRenderer.render(this.stage);
    }

    isVisible(entity) {
        if(!entity.body) return false;//if there is no body, is not visible

        let bodyXMin = entity.body.bounds.min.x;
        let bodyXMax = entity.body.bounds.max.x;
        let bodyYMin = entity.body.bounds.min.y;
        let bodyYMax = entity.body.bounds.max.y;

        return Matter.Bounds.contains(viewPort.bounds,{x:bodyXMin,y:bodyYMin})||
            Matter.Bounds.contains(viewPort.bounds,{x:bodyXMin,y:bodyYMax})||
            Matter.Bounds.contains(viewPort.bounds,{x:bodyXMax,y:bodyYMin})||
            Matter.Bounds.contains(viewPort.bounds,{x:bodyXMax,y:bodyYMax});
    }
}