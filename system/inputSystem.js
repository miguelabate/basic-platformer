class InputSystem {

    engine = undefined;//matter engine
    entitiesManager = undefined;//EntitiesManager
    viewPort = undefined;//used to add it when creating entities

    constructor(entitiesManager, engine, viewPort) {
        this.engine = engine;
        this.entitiesManager = entitiesManager;
        this.viewPort = viewPort;

        this.init();
    }

    update(deltaTime){
        this.up.update(deltaTime);
        this.left.update(deltaTime);
        this.right.update(deltaTime);
        this.keyN.update(deltaTime);
    }

    init() {
        this.up = this.keyboard(this,"ArrowUp", false,30);
        this.right = this.keyboard(this,"ArrowRight",true,30);
        this.left = this.keyboard(this,"ArrowLeft",true,30);
        this.keyN = this.keyboard(this,"n",true,70);

        /////UP
        ////press
        this.up.press = function(inputSys){
            let playerEntity = inputSys.entitiesManager.getPlayerEntities()[0];
            if (playerEntity.body.velocity.y  <0.2 && playerEntity.body.velocity.y  > -0.2) //TODO: move this "events"/methods as events to some kind of queue that is handled by other systems. EG: movement evnet, create body event
                Body.setVelocity(playerEntity.body, {x: playerEntity.body.velocity.x, y: -12});
        };

        //release
        this.up.release=function(inputSys){
            let playerEntity = inputSys.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: playerEntity.body.velocity.x, y: playerEntity.body.velocity.y/2});
        };

        //RIGHT
        //press
        this.right.press = function(inputSys){
            let playerEntity = inputSys.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: 4, y: playerEntity.body.velocity.y});
            playerEntity.bearing = "RIGHT";
        };

        //release
        this.right.release=function(inputSys){
            let playerEntity = inputSys.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: 0, y: playerEntity.body.velocity.y});
        };

        //LEFT
        //press
        this.left.press = function(inputSys){
            let playerEntity = inputSys.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: -4, y: playerEntity.body.velocity.y});
            playerEntity.bearing = "LEFT";
        };

        //release
        this.left.release=function(inputSys){
            let playerEntity = inputSys.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: 0, y: playerEntity.body.velocity.y});
        };

        //N
        //press
        this.keyN.press = function(inputSys){
            let bulletEntity = new BulletEntity();

            bulletEntity.viewPort = inputSys.viewPort;
            bulletEntity.state = new StateComponent(BulletStateEnum.BODY_MISSING);
            inputSys.entitiesManager.addBulletEntity(bulletEntity);

        };

        //release
        this.keyN.release=function(inputSys){
        };
    }

    keyboard(inputSys, value, allowPressed = true, keyThrottleTime) {
        let key = {};
        key.value = value;
        key.allowPressed=allowPressed;

        key.isDown = false;
        key.semaphoreDown=true;
        key.isUp = true;
        key.semaphoreUp=true;

        key.press = undefined;
        key.release = undefined;

        key.lag = 0;

        //The `downHandler`
        key.downHandler = event => {
            if (event.key === key.value) {
                    key.isDown = true;
                    key.isUp = false;
                event.preventDefault();
            }
        };

        //The `upHandler`
        key.upHandler = event => {
            if (event.key === key.value) {
                    key.isDown = false;
                    key.isUp = true;
                event.preventDefault();
            }
        };

        //Attach event listeners
        const downListener = key.downHandler.bind(key);
        const upListener = key.upHandler.bind(key);

        window.addEventListener(
            "keydown", downListener, false
        );
        window.addEventListener(
            "keyup", upListener, false
        );

        // Detach event listeners
        key.unsubscribe = () => {
            window.removeEventListener("keydown", downListener);
            window.removeEventListener("keyup", upListener);
        };

        key.update = function(deltaTime) {
            key.lag +=deltaTime;
            if(key.lag>keyThrottleTime) {
                //up
                // press
                if (key.isDown && key.semaphoreDown) {
                    key.press(inputSys);
                    key.semaphoreDown = key.allowPressed;
                    key.semaphoreUp = true;
                }
                //release
                if (key.isUp && key.semaphoreUp) {
                    key.release(inputSys);
                    key.semaphoreUp = false;
                    key.semaphoreDown = true;
                }
                //reset laginput
                key.lag = 0;
            }
        };
        return key;
    }


}