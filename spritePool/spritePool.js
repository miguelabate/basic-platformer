class SpritePool {

    constructor() {
        this.sprites = {"DEFAULT":[]};
    }
    borrowSprite() {
        // console.log("borrowed sprite DEFAULT");
        // console.log("pool size DEFAULT: "+this.sprites["DEFAULT"].length);
        let spriteToReturn = this.sprites["DEFAULT"].shift();
        if(spriteToReturn instanceof PIXI.AnimatedSprite){
            spriteToReturn.play();
        }
        return spriteToReturn;
    };

    borrowSpriteWithState(state) {
        // console.log("borrowed sprite fro state: "+state);
        // console.log("pool size: "+this.sprites[state].length);
        let spriteToReturn = this.sprites[state].shift();
        if(spriteToReturn instanceof PIXI.AnimatedSprite){
            spriteToReturn.play();
        }
        return spriteToReturn;
    };

    returnSprite(sprite) {
        // console.log("returned sprite  DEFAULT");
        // this.sprites["DEFAULT"].push(sprite);
        if(sprite instanceof PIXI.AnimatedSprite){
            sprite.stop();
        }
    };
    returnSpriteWithState(sprite, state) {
        // console.log("returned sprite");
        this.sprites[state].push(sprite);
        if(sprite instanceof PIXI.AnimatedSprite){
            sprite.stop();
        }
    };

}