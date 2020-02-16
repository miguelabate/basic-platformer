import {BearingEnum, CoinStateEnum, EnemyStateEnum, GenericStateEnum, PlayerStateEnum} from "../GeneralEnums.js";

export class StateSystem {

    entitiesManager = undefined;//entities manager
    worldStateService = undefined;//worldStateService

    constructor(entitiesManager, worldStateService) {
        this.entitiesManager = entitiesManager;
        this.worldStateService = worldStateService;
    }

    update() {
        let isPlayerOnTheGround = this.worldStateService.isPlayerOnTheGround();

        //player
        let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        if(playerEntity.bearing === BearingEnum.RIGHT) {
            if (!isPlayerOnTheGround){
                playerEntity.state.setState(PlayerStateEnum.JUMP_RIGHT);
            } else {
                if(playerEntity.body.velocity.x > 0.5)
                    playerEntity.state.setState(PlayerStateEnum.MOVE_RIGHT);
                else
                    playerEntity.state.setState(PlayerStateEnum.REST_RIGHT);
            }
        }else {//LEFT bearing
            if (!isPlayerOnTheGround){
                playerEntity.state.setState( PlayerStateEnum.JUMP_LEFT);
            } else{
                if(playerEntity.body.velocity.x < -0.5)
                    playerEntity.state.setState( PlayerStateEnum.MOVE_LEFT);
                else
                    playerEntity.state.setState(PlayerStateEnum.REST_LEFT);
            }
        }

        //coins
        let coinEntityList = this.entitiesManager.getCoinEntities();
        for(let i=0;coinEntityList.length>i;i++) {
            if (coinEntityList[i].state.getState() === CoinStateEnum.DISAPPEAR) {
                if (performance.now() - coinEntityList[i].state.getTimeChanged() > 500) {
                    coinEntityList[i].state.setState(GenericStateEnum.TO_REMOVE);
                }
            }
        }
        //enemies
        let enemyEntityList = this.entitiesManager.getEnemyEntities();
        for(let i=0;enemyEntityList.length>i;i++) {
            if (enemyEntityList[i].state.getState() === EnemyStateEnum.DISAPPEAR) {
                if (performance.now() - enemyEntityList[i].state.getTimeChanged() > 400) {
                    enemyEntityList[i].state.setState(GenericStateEnum.TO_REMOVE);
                }
            }
        }
    }

}