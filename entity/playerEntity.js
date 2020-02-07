class PlayerEntity {

    type=GlobalConfig.entities.player.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    viewPort=undefined;
    state= new StateComponent(PlayerStateEnum.REST_RIGHT);
    bearing=BearingEnum.RIGHT;

    constructor() {
    }

}