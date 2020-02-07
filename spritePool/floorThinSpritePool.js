class FloorThinSpritesPool extends SpritePool {

    constructor() {
        super();
        this.addFloorThinSprites(50,"images/game/game.json");
    }

    addFloorThinSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sprite = new Sprite(resources[resourceId].spritesheet.textures["ground-thin.png"]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width =GlobalConfig.entities.floorThin.width;
            sprite.height =GlobalConfig.entities.floorThin.height;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= GenericStateEnum.DEFAULT;//custom field
            this.sprites[GenericStateEnum.DEFAULT].push(sprite);
        }
    };

}