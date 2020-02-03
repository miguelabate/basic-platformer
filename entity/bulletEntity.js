class BulletEntity {

    type="BULLET";
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=false;
    viewPort=undefined;
    state = new StateComponent(GenericStateEnum.DEFAULT);
    selfMovement = new BulletMovementComponent();
    bearing="RIGHT";

    constructor() {
    }

}