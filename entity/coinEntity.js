class CoinEntity {

    type = "COIN";
    body = undefined;//Matter Body
    sprite = undefined;// Pixi Sprite
    existsOutsideViewPort = true;
    viewPort=undefined;
    state = new StateComponent(CoinStateEnum.ROTATE);

    constructor() {
    }
}