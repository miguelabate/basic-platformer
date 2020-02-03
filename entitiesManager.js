class EntitiesManager {

    bulletEntitiesList=[]; //sprite, body, existsOutsideViewPort=false,viewPort, selfmovement
    playerEntitiesList=[];//sprite, body,viewPort
    enemyEntitiesList=[];//sprite, body, selfmovement,viewPort
    backgroundEntitiesList=[];//sprite
    floorEntitiesList = [];//sprite, body, viewPort
    bigBrickEntitiesList = [];//sprite, body, viewPort
    coinEntitiesList = [];//sprite, body, viewPort

    constructor() {
    }

    getBulletEntities() {
       return this.bulletEntitiesList;
    }

    getPlayerEntities() {
        return this.playerEntitiesList;
    }

    getBackgroundEntities() {
        return this.backgroundEntitiesList;
    }

    getEnemyEntities() {
        return this.enemyEntitiesList;
    }

    getFloorEntities() {
        return this.floorEntitiesList;
    }

    getBigBrickEntities() {
        return this.bigBrickEntitiesList;
    }

    getCoinEntities() {
        return this.coinEntitiesList;
    }
    ///////////////////// SPECIAL GET: BY ID //////////////////////
    getCoinEntityByBodyId(bodyId) {
        for(let i=0;this.coinEntitiesList.length>i;i++) {
            if(this.coinEntitiesList[i].body.id === bodyId){
                return this.coinEntitiesList[i]
            }
        }
    }
    ///////////////////// SPECIAL GETS: GROUPING ///////////////////////

    getEntitiesWithSpriteAndBodyComponent(){
        return  [...this.bulletEntitiesList, ...this.playerEntitiesList, ...this.enemyEntitiesList, ...this.floorEntitiesList, ...this.bigBrickEntitiesList, ...this.coinEntitiesList];
    }

    getEntitiesWithSelfMovementAndBodyComponent(){
        return  [...this.enemyEntitiesList, ...this.bulletEntitiesList];
    }

    getEntitiesThatDoNotExistsOutsideViewPort(){
        return  [...this.bulletEntitiesList];
    }

    getEntitiesWithViewPort(){
        return  [...this.bulletEntitiesList, ...this.playerEntitiesList, ...this.enemyEntitiesList, ...this.floorEntitiesList, ...this.bigBrickEntitiesList, ...this.coinEntitiesList];
    }

    getEntitiesWithViewPortAndState(){
        return  [...this.bulletEntitiesList, ...this.playerEntitiesList, ...this.enemyEntitiesList, ...this.floorEntitiesList, ...this.bigBrickEntitiesList, ...this.coinEntitiesList];
    }

    getEntitiesWithState() {
        return [...this.playerEntitiesList, ...this.enemyEntitiesList, ...this.floorEntitiesList, ...this.bigBrickEntitiesList, ...this.coinEntitiesList];
    }

    getAllEntitiesWithState(){
        return  [...this.bulletEntitiesList, ...this.playerEntitiesList, ...this.enemyEntitiesList, ...this.floorEntitiesList, ...this.bigBrickEntitiesList, ...this.coinEntitiesList];
    }

    /**state is a string defined in stateEnums.js**/
    getEntitiesByState(state){
        let result = this.getAllEntitiesWithState().filter(e => e.state.getState() === state);//e: entity e.state: StateComponent
        if(result)
            return result;
        else
            return [];
    }

    //////////////////////// ADD METHODS ////////////////////

    addBulletEntity(bulletEntity){
        this.bulletEntitiesList.push(bulletEntity);
    }

    addPlayerEntity(playerEntity) {
        this.playerEntitiesList.push(playerEntity);
    }

    addBackgroundEntity(backgroundEntity) {
        this.backgroundEntitiesList.push(backgroundEntity);
    }

    addEnemyEntity(enemyEntity){
        this.enemyEntitiesList.push(enemyEntity);
    }

    addFloorEntity(floorEntity){
        this.floorEntitiesList.push(floorEntity);
    }

    addBigBrickEntity(bigBrickEntity){
        this.bigBrickEntitiesList.push(bigBrickEntity);
    }

    addCoinEntity(coinEntity){
        this.coinEntitiesList.push(coinEntity);
    }
    /////// UTILITY METHODS /////////////////////

    //clean. Remove entities without body (and that should have)
    removeEntitiesWithoutBodyFromAll(){
        this.removeEntitiesWithoutBodyAndSpriteAndToRemoveFrom(this.bulletEntitiesList);
        this.removeEntitiesWithoutBodyAndSpriteAndToRemoveFrom(this.playerEntitiesList);
        this.removeEntitiesWithoutBodyAndSpriteAndToRemoveFrom(this.enemyEntitiesList);
        this.removeEntitiesWithoutBodyAndSpriteAndToRemoveFrom(this.floorEntitiesList);
        this.removeEntitiesWithoutBodyAndSpriteAndToRemoveFrom(this.bigBrickEntitiesList);
        this.removeEntitiesWithoutBodyAndSpriteAndToRemoveFrom(this.coinEntitiesList);
    }

    removeEntitiesWithoutBodyAndSpriteAndToRemoveFrom(anEntityList){
        for(let i=anEntityList.length-1;i>=0;i--){
            if(!anEntityList[i].body&&!anEntityList[i].sprite&&anEntityList[i].state.getState()===GenericStateEnum.TO_REMOVE){
                anEntityList.splice(i,1);
                console.log("Removed entity");
            }
        }
    }

}