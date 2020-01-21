class FloorEntity {

    type="FLOOR";
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=false;

    constructor() {
    }

    isVisible(viewPort) {
        let bodyXMin = this.body.bounds.min.x;
        let bodyXMax = this.body.bounds.max.x;
        let bodyYMin = this.body.bounds.min.y;
        let bodyYMax = this.body.bounds.max.y;

        return Matter.Bounds.contains(viewPort.bounds,{x:bodyXMin,y:bodyYMin})||
            Matter.Bounds.contains(viewPort.bounds,{x:bodyXMin,y:bodyYMax})||
            Matter.Bounds.contains(viewPort.bounds,{x:bodyXMax,y:bodyYMin})||
            Matter.Bounds.contains(viewPort.bounds,{x:bodyXMax,y:bodyYMax});
    }

}