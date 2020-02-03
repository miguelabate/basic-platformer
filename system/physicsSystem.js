class PhysicsSystem {

    entitiesManager = undefined;//entities manager
    engine = undefined; //matter engine
    MS_PER_UPDATE=16.666;
    lag = 0;

    constructor(entitiesmanager) {
        this.entitiesManager = entitiesmanager;
        // create an engine
        this.engine = Engine.create();
        this.engine.world.gravity.y = 1.7;

        //add engine event listener logic
        this.bindEvents(this.entitiesManager,this.engine, this);
    }

    update(deltaTime) {
        this.lag += deltaTime;
        if(this.lag > 1000){//if too much lag, pauses basically
            this.lag = 0;
            console.log("discarded time delay. Too much to catchup");
        }

        //create bullets
        let entitiesBulletsWithoutBody = entitiesManager.getEntitiesByState(BulletStateEnum.BODY_MISSING);
        for(let i=entitiesBulletsWithoutBody.length-1;i>=0;i--){
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            let bulletBody;
            let bulletEntity = entitiesBulletsWithoutBody[i];

            if(playerEntity.bearing === "RIGHT") {
                bulletBody = Bodies.rectangle(playerEntity.body.bounds.max.x + 50, playerEntity.body.position.y - 10, 12, 12, {
                    restitution: 0,
                    friction: 0,
                    frictionAir: 0
                });
                bulletEntity.bearing = "RIGHT";
            }else{
                bulletBody = Bodies.rectangle(playerEntity.body.bounds.min.x - 50, playerEntity.body.position.y - 10, 12, 12, {
                    restitution: 0,
                    friction: 0,
                    frictionAir: 0
                });
                bulletEntity.bearing = "LEFT";
            }

            bulletBody.customType = 'BULLET';
            bulletEntity.body = bulletBody;
            bulletEntity.state =  new StateComponent(GenericStateEnum.DEFAULT);//TODO: change sprite generation to use moving state
            World.add(this.engine.world, bulletBody);
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
            if(aElm.customType=='BULLET'){
                physicsSys.removeBulletBodyFromentitiesList(entitiesManager.getBulletEntities(), aElm.id);
            }

            if(bElm.customType=='BULLET'){
                physicsSys.removeBulletBodyFromentitiesList(entitiesManager.getBulletEntities(), bElm.id);
            }

            //collision player
            if((aElm.customType=='ENEMY'  && bElm.customType=='PLAYER')||(bElm.customType=='ENEMY'  && aElm.customType=='PLAYER')){
                console.log("YOu DIeD!");
            }

            //collision coin
            if(aElm.customType==='COIN'  || bElm.customType==='COIN'){
                let bodyId;
                if(aElm.customType==='COIN' )bodyId=aElm.id;
                if(bElm.customType==='COIN' )bodyId=bElm.id;

                console.log("coin collected!");
                let coinEntity = entitiesManager.getCoinEntityByBodyId(bodyId);
                if(coinEntity!==undefined) {
                    if(coinEntity.state.getState()!== GenericStateEnum.TO_REMOVE)
                        coinEntity.state.setState(CoinStateEnum.DISAPPEAR);
                }
            }
        });
    }


    removeBulletBodyFromentitiesList(listEntities, bodyId){
        for(let i=listEntities.length-1;i>=0;i--){//move this inside bullet entity
            if(listEntities[i].body&&listEntities[i].body.id==bodyId){
                World.remove(this.engine.world, listEntities[i].body);
                delete listEntities[i].body
            }
        }
    }

    isVisible(entity) {
        if(!entity.body) return false;//if there is no body, is not visible

        let bodyXMin = entity.body.bounds.min.x;
        let bodyXMax = entity.body.bounds.max.x;
        let bodyYMin = entity.body.bounds.min.y;
        let bodyYMax = entity.body.bounds.max.y;

        return Matter.Bounds.contains(entity.viewPort.bounds,{x:bodyXMin,y:bodyYMin})||
            Matter.Bounds.contains(entity.viewPort.bounds,{x:bodyXMin,y:bodyYMax})||
            Matter.Bounds.contains(entity.viewPort.bounds,{x:bodyXMax,y:bodyYMin})||
            Matter.Bounds.contains(entity.viewPort.bounds,{x:bodyXMax,y:bodyYMax});
    }

}