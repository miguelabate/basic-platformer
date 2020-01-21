class SpritePool {

    constructor() {
        this.sprites = [];
    }
    borrowSprite() {
        console.log("borrowed sprite");
        console.log("pool size: "+this.sprites.length);
        return this.sprites.shift();
    };

    returnSprite(sprite) {
        console.log("returned sprite");
        this.sprites.push(sprite);
    };
}