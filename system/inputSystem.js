import {BearingEnum, BulletStateEnum} from "../GeneralEnums.js";
import {BulletEntity} from "../entity/bulletEntity.js";
import {StateComponent} from "../component/stateComponent.js";
import {Body} from "../Configuration.js";

export class InputSystem {

    worldStateService = undefined;//worldStateService
    entitiesManager = undefined;//EntitiesManager

    constructor(entitiesManager, worldStateService) {
        this.worldStateService = worldStateService;
        this.entitiesManager = entitiesManager;

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
        this.keyN = this.keyboard(this,"n",false,50);

        /////UP
        ////press
        this.up.press = function(inputSys){
            let playerEntity = inputSys.entitiesManager.getPlayerEntities()[0];
            let playerOnGround = inputSys.worldStateService.isPlayerOnTheGround();
            if (playerOnGround) {
                Body.setVelocity(playerEntity.body, {x: playerEntity.body.velocity.x, y: -12});
            }
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
            playerEntity.bearing = BearingEnum.RIGHT;
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
            playerEntity.bearing = BearingEnum.LEFT;
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

            // bulletEntity.viewPort = inputSys.viewPort;
            bulletEntity.state = new StateComponent(BulletStateEnum.MOVING);
            inputSys.worldStateService.addBulletBodyToEntity(bulletEntity);
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