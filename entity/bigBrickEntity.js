class BigBrickEntity {

    type=GlobalConfig.entities.bigBrick.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    state = new StateComponent(GenericStateEnum.DEFAULT);

    constructor() {
    }

}