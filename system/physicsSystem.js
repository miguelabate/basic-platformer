class PhysicsSystem {

    entitiesManager = undefined;//entities manager
    engine = undefined; //matter engine
    MS_PER_UPDATE=16.666;
    lag = 0;
    worldStateService = undefined;

    constructor(entitiesManager, worldStateService) {
        this.entitiesManager = entitiesManager;
        this.worldStateService = worldStateService;
        this.engine = worldStateService.engine;

        //add engine event listener logic
        this.bindEvents(this.entitiesManager, this.engine, this);
    }

    update(deltaTime) {
        this.lag += deltaTime;
        if(this.lag > 1000){//if too much lag, pauses basically
            this.lag = 0;
            console.log("discarded time delay. Too much to catchup");
        }

        //update engine, catch up
        while (this.lag > this.MS_PER_UPDATE) {
            Engine.update(this.engine, this.MS_PER_UPDATE);
            this.lag -= this.MS_PER_UPDATE;
        }

        //eliminate bodies of entities that should not exiss outside viewport
        let entities = entitiesManager.getEntitiesThatDoNotExistsOutsideViewPort();
        for(let i=entities.length-1;i>=0;i--){
            if(!this.isVisible(entities[i])&& entities[i].body) {
                entities[i].state.setState(GenericStateEnum.TO_REMOVE);
            }
        }

        //eliminate bodies of entities with state TO_REMOVE
        entities = entitiesManager.getEntitiesByState(GenericStateEnum.TO_REMOVE);
        for(let i=entities.length-1;i>=0;i--){
            World.remove(this.engine.world, entities[i].body);
            delete entities[i].body;
        }

    }

    bindEvents(entitiesManager, engine, physicsSys)  {
        //beforeUpdate
        Events.on(this.engine, 'beforeUpdate', function() {
            //entities that self move
            for (let entity of entitiesManager.getEntitiesWithSelfMovementAndBodyComponent()) {
                entity.selfMovement.move(entity, engine);
            }

        });

        //collisionStart
        Matter.Events.on(this.engine, 'collisionStart', function(event) {//collisionEnd
            physicsSys.collisionStartHandler(event);
        });
    }

    collisionStartHandler(event) {
        // We know there was a collision so fetch involved elements ...
        let aElm = event.pairs[0].bodyA;
        let bElm = event.pairs[0].bodyB;

        if(this.isCollisionBetweenTwoTypes(aElm, bElm,GlobalConfig.entities.bullet.type, GlobalConfig.entities.enemy.type)) {
            this.handleCollisionBetweenBulletAndEnemy(aElm, bElm);

        } else if (this.isCollisionBetweenTypeAndAny(aElm, bElm,GlobalConfig.entities.bullet.type)){
            this.handleCollisionBetweenBulletAndAnything(aElm, bElm);
        }

        //collision player/enemy
        if(this.isCollisionBetweenTwoTypes(aElm, bElm,GlobalConfig.entities.player.type, GlobalConfig.entities.enemy.type)) {
            this.handleCollisionBetweenPlayerAndEnemy(aElm,bElm);
        }

        //collision coin
        if(aElm.customType===GlobalConfig.entities.coin.type  || bElm.customType===GlobalConfig.entities.coin.type){
            let bodyId;
            if(aElm.customType===GlobalConfig.entities.coin.type )bodyId=aElm.id;
            if(bElm.customType===GlobalConfig.entities.coin.type )bodyId=bElm.id;

            console.log("coin collected!");
            let coinEntity = entitiesManager.getCoinEntityByBodyId(bodyId);
            if(coinEntity!==undefined) {
                if(coinEntity.state.getState()!== GenericStateEnum.TO_REMOVE)
                    coinEntity.state.setState(CoinStateEnum.DISAPPEAR);
            }
        }
    }

    handleCollisionBetweenBulletAndAnything(aElm, bElm) {
        console.log("Bullet Missed!");
        //    physicsSys.worldStateService.removeBulletBodyFromEntitiesList(physicsSys.getIdOfType(aElm, bElm, GlobalConfig.entities.bullet.type));
        let bulletEntity = entitiesManager.getBulletEntityByBodyId(this.getIdOfType(aElm, bElm, GlobalConfig.entities.bullet.type));
        bulletEntity.state.setState(GenericStateEnum.TO_REMOVE);
    }

    handleCollisionBetweenBulletAndEnemy(aElm, bElm) {
        console.log("Killed Enemy!");
        // mark bullet to be removed
        let bulletEntity = entitiesManager.getBulletEntityByBodyId(this.getIdOfType(aElm, bElm, GlobalConfig.entities.bullet.type));
        bulletEntity.state.setState(GenericStateEnum.TO_REMOVE);
        //state of th enemy to start dying. set filter so it doesnt interfere
        let enemyEntity = entitiesManager.getEnemyEntityByBodyId(this.getIdOfType(aElm, bElm, GlobalConfig.entities.enemy.type));
        enemyEntity.state.setState(EnemyStateEnum.DISAPPEAR);
        enemyEntity.body.collisionFilter.mask = ~(CategoriesFilter.COIN | CategoriesFilter.PLAYER | CategoriesFilter.BULLET);
    }

    handleCollisionBetweenPlayerAndEnemy(aElm, bElm) {
        console.log("YOu were hit!");
        // mark bullet to be removed
        let playerEntity = entitiesManager.getPlayerEntityByBodyId(this.getIdOfType(aElm, bElm, GlobalConfig.entities.player.type));
        playerEntity.health.decreaseHealth(10);

    }

    isCollisionBetweenTwoTypes(aElm, bElm, type1, type2) {
        return (aElm.customType===type1 && bElm.customType===type2)||(bElm.customType===type1 && aElm.customType===type2);
    }

    isCollisionBetweenTypeAndAny(aElm, bElm, type) {
        return aElm.customType===type||bElm.customType===type;
    }


    getIdOfType(aElm, bElm, type){
        if(aElm.customType === type){
            return aElm.id;
        } else if(bElm.customType === type){
            return  bElm.id;
        } else {
            return undefined;
        }
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