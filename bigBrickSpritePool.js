class BigBrickSpritesPool extends SpritePool {

    constructor() {
        super();
        this.addBigBrickSprites(10,"images/game/game.json");
    }

    addBigBrickSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sprite = new Sprite(resources[resourceId].spritesheet.textures["big-brick-grey.png"]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x =4
            sprite.scale.y =4
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;

            this.sprites.push(sprite);
        }
    };

}