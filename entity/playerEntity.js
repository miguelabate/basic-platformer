class PlayerEntity {

    type=GlobalConfig.entities.player.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    state= new StateComponent(PlayerStateEnum.REST_RIGHT);
    bearing=BearingEnum.RIGHT;
    health = new HealthComponent(100);

    constructor() {
    }

}