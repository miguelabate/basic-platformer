class PlayerEntity {

    type="PLAYER";
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    viewPort=undefined;
    state= new StateComponent(PlayerStateEnum.REST_RIGHT);
    bearing="RIGHT";

    constructor() {
    }

}