class FloorWTreeEntity {

    type=GlobalConfig.entities.floorWTree.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    state=new StateComponent(GenericStateEnum.DEFAULT);

    constructor() {
    }

}