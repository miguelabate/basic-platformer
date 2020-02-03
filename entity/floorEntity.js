class FloorEntity {

    type="FLOOR";
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    viewPort=undefined;
    state=new StateComponent(GenericStateEnum.DEFAULT);

    constructor() {
    }

}