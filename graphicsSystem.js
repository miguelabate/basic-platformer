//now only used for bullets
class GraphicsSystem {

    stage = undefined;//pixi stage
    entitiesmanager = undefined;//entities manager
    viewPort = undefined;

    bulletSpritePool = undefined;
    playerSpritePool = undefined;
    backgroundSpritePool = undefined;
    enemiesSpritePool = undefined;
    floorThinSpritePool = undefined;

    constructor(pixiStage, entitiesmanager, viewPort) {
        this.stage = pixiStage;
        this.entitiesmanager = entitiesmanager;
        this.viewPort = viewPort;

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
    }

    getSpritePoolFor(entity){
        if(entity.type=="BULLET"){
            return this.bulletSpritePool;
        } else if (entity.type=="PLAYER"){
            return this.playerSpritePool;
        }  else if (entity.type=="ENEMY"){
            return this.enemiesSpritePool;
        } else if (entity.type=="FLOOR"){
            return this.floorThinSpritePool;
        } else{
            console.log("Error fetching Sprite Pool for entity. Unrecognized type.");
        }
    }
    update() {
        //iterate enttities with body and sprite component, decide if need to draw them
        let entities = this.entitiesmanager.getEntitiesWithSpriteAndBodyComponent();
        if (entities) {//needs to be there before doing anything
            for (let i = 0; i < entities.length; i++) {
                if (entities[i]) {
                    if (entities[i].isVisible(viewPort)) {
                        if (!entities[i].sprite) {
                            entities[i].sprite = this.getSpritePoolFor(entities[i]).borrowSprite();
                        }
                        entities[i].sprite.x = entities[i].body.position.x - viewPort.offset.x;
                        entities[i].sprite.y = entities[i].body.position.y;
                        entities[i].sprite.rotation = entities[i].body.angle;

                        if (!entities[i].sprite.parent) {
                            this.stage.addChild(entities[i].sprite);
                        }

                    } else { //sprite not in viewport, return it and take out of scene
                        if (entities[i].sprite) {//not undefined
                            this.stage.removeChild(entities[i].sprite);
                            this.getSpritePoolFor(entities[i]).returnSprite(entities[i].sprite);
                            entities[i].sprite = undefined;
                        }
                    }
                }
            }
        }

        /// background handling
        if (entitiesManager.getBackgroundEntities().length == 1 && !entitiesManager.getBackgroundEntities()[0].sprite) {
            backSprite = this.backgroundSpritePool.borrowSprite();
            backSprite.x = 0;
            backSprite.y = 0;
            entitiesManager.getBackgroundEntities()[0].sprite = backSprite;
            // backSprite.zIndex = 100;
            this.stage.addChild(backSprite);
            this.stage.setChildIndex(backSprite, 0);
        }

        //move camera to follow player
        //some basic view port update considering the camera followinfg the guy sprite
        // if (playerEntity.sprite) {
        //     if (playerEntity.sprite.x > viewPort.size.width - 100) viewPort.offset.x += 1;
        //     if (playerEntity.sprite.x < 100) viewPort.offset.x -= 1;
        // }
        let playerX = playerEntity.body.position.x;
        let playerY = playerEntity.body.position.y;
        //for now only check center visibility
        if (playerX < viewPort.offset.x + 300) {
            viewPort.offset.x -= 3;
            entitiesManager.getBackgroundEntities()[0].sprite.tilePosition.x += 0.128; //background move, just for test
        } else if (playerX > viewPort.offset.x + viewPort.size.width - 300) {
            viewPort.offset.x += 3;
            entitiesManager.getBackgroundEntities()[0].sprite.tilePosition.x -= 0.128; //background move, just for test

        }    //&& playerY  > viewPort.offset.y && playerY < viewPort.offset.y+viewPort.size.height;


    }

}