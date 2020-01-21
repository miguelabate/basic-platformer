class PlayerEntity {

    type="PLAYER";
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;

    constructor() {
    }

    isVisible(viewPort) {
        let bodyX = this.body.position.x;
        let bodyY = this.body.position.y;
        //for now only check center visibility
        return bodyX  > viewPort.offset.x && bodyX < viewPort.offset.x+viewPort.size.width
                && bodyY  > viewPort.offset.y && bodyY < viewPort.offset.y+viewPort.size.height;
    }

}