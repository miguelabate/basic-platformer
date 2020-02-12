/**
 * System that polls the state and values of different entities and triggers action if certain conditions are met
 */
class ConditionCheckSystem {

    entitiesManager = undefined;//entities manager
    worldStateService = undefined;//worldStateService
    gameStateService = undefined;//gameStateService

    constructor(entitiesManager, worldStateService, gameStateService) {
        this.entitiesManager = entitiesManager;
        this.worldStateService = worldStateService;
        this.gameStateService = gameStateService;
    }

    update() {
        //player health check condition. Check if dead.
        if(this.entitiesManager.getPlayerEntities()[0].health.getHealth()<=0){
            this.gameStateService.setGameIsPlaying(false);
        }
    }

}