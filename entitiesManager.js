class EntitiesManager {

    bulletEntitiesList=[]; //sprite, body
    playerEntitiesList=[];//sprite, body
    enemyEntitiesList=[];//sprite, body
    backgroundEntitiesList=[];//sprite
    floorEntitiesList = [];

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

    getEntitiesWithSpriteAndBodyComponent(){
        return  [...this.bulletEntitiesList, ...this.playerEntitiesList, ...this.enemyEntitiesList, ...this.floorEntitiesList];
    }

    getEntitiesWithSelfMovementAndBodyComponent(){
        return  [...this.enemyEntitiesList];
    }

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

}