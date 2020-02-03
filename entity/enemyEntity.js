class EnemyEntity {

    type = "ENEMY";
    body = undefined;//Matter Body
    sprite = undefined;// Pixi Sprite
    existsOutsideViewPort = true;
    selfMovement = undefined;
    viewPort=undefined;
    state=new StateComponent(GenericStateEnum.DEFAULT);

    constructor() {
    }
}