class BackgroundSpritesPool extends SpritePool {

    constructor() {
        super();
        this.addBackgroundSprites(1,"images/game/game.json");
    }

    addBackgroundSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sheet = resources[resourceId].spritesheet;
            let texture = sheet.textures["background.png"];
            let sprite = new TilingSprite(texture,texture.width,texture.height);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            let ratio = texture.width/texture.height;//background ratio
            sprite.scale.set((GlobalConfig.viewport.height*ratio)/texture.width, GlobalConfig.viewport.height/texture.height);//scale up to fit height
            sprite.width = GlobalConfig.viewport.width;//stretch wide to fill screen, since it's tileset it will repeat
            sprite.tilePosition.x = 0;
            sprite.tilePosition.y = 0;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.customState= GenericStateEnum.DEFAULT;//custom field
            this.sprites[GenericStateEnum.DEFAULT].push(sprite);
        }
    };

}