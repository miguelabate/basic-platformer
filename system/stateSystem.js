class StateSystem {

    entitiesManager = undefined;//entities manager

    constructor(entitiesmanager) {
        this.entitiesManager = entitiesmanager;
    }

    update() {
        //player
        let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        if(playerEntity.bearing === "RIGHT") {
            if (playerEntity.body.velocity.y < -0.1 || playerEntity.body.velocity.y > 0.1) {
                playerEntity.state.setState(PlayerStateEnum.JUMP_RIGHT);
            } else if (playerEntity.body.velocity.y > -0.5 && playerEntity.body.velocity.y < 0.5) {
                if(playerEntity.body.velocity.x > 0.5)
                    playerEntity.state.setState(PlayerStateEnum.MOVE_RIGHT);
                else
                    playerEntity.state.setState(PlayerStateEnum.REST_RIGHT);
            }
        }else {//LEFT bearing

            if (playerEntity.body.velocity.y < -0.1 || playerEntity.body.velocity.y > 0.1) {
                playerEntity.state.setState( PlayerStateEnum.JUMP_LEFT);
            } else if (playerEntity.body.velocity.y > -0.5 && playerEntity.body.velocity.y < 0.5) {
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

    }

}