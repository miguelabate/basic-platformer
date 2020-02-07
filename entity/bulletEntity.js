class BulletEntity {

    type=GlobalConfig.entities.bullet.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=false;
    viewPort=undefined;
    state = new StateComponent(GenericStateEnum.DEFAULT);
    selfMovement = new BulletMovementComponent();
    bearing=BearingEnum.RIGHT;

    constructor() {
    }

}