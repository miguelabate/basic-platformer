class BackgroundSpritesPool extends SpritePool {

    constructor() {
        super();
        this.addBackgroundSprites(1,"images/game/game.json");
    }

    addBackgroundSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sheet = resources[resourceId].spritesheet;
            let sprite = new TilingSprite(sheet.textures["background.png"],160,144);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x=5;
            sprite.scale.y=3.2;
            sprite.tilePosition.x = 0;
            sprite.tilePosition.y = 0;
            sprite.anchor.x = 0;
            sprite.anchor.y = 0;

            this.sprites.push(sprite);
        }
    };

}