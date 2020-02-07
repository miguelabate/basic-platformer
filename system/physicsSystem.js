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
                World.remove(this.engine.world, entities[i].body);
                delete entities[i].body;
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
            // We know there was a collision so fetch involved elements ...
            let aElm = event.pairs[0].bodyA;
            let bElm = event.pairs[0].bodyB;

            // Event listener: collision bullet
            if(aElm.customType===GlobalConfig.entities.bullet.type){
                physicsSys.worldStateService.removeBulletBodyFromEntitiesList(aElm.id);
            }

            if(bElm.customType===GlobalConfig.entities.bullet.type){
                physicsSys.worldStateService.removeBulletBodyFromEntitiesList(bElm.id);
            }

            //collision player
            if((aElm.customType===GlobalConfig.entities.enemy.type  && bElm.customType===GlobalConfig.entities.player.type)||(bElm.customType===GlobalConfig.entities.enemy.type  && aElm.customType===GlobalConfig.entities.player.type)){
                console.log("YOu DIeD!");
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
        });
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