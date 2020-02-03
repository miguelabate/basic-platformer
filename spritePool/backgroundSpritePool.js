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
            var ratio = 160/144;//viewport ratio
            sprite.scale.set((500*ratio)/160,500/144);
            sprite.width=1200;
            sprite.tilePosition.x = 0;
            sprite.tilePosition.y = 0;
            sprite.anchor.x = 0;
            sprite.anchor.y = 0;
            sprite.customState= GenericStateEnum.DEFAULT;//custom field
            this.sprites[GenericStateEnum.DEFAULT].push(sprite);
        }
    };

}