class CoinEntity {

    type = GlobalConfig.entities.coin.type;
    body = undefined;//Matter Body
    sprite = undefined;// Pixi Sprite
    existsOutsideViewPort = true;
    state = new StateComponent(CoinStateEnum.ROTATE);

    constructor() {
    }
}