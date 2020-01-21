class EnemySpritesPool extends SpritePool {

    constructor() {
        super();
        this.addPlayerSprites(1,"images/game/game.json");
    }

    addPlayerSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sheet = resources[resourceId].spritesheet;
            let  sprite = new PIXI.AnimatedSprite(sheet.animations["enemy"]);
            sprite.animationSpeed = 0.2;
            sprite.play();
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width=64;
            sprite.height=64;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;

            this.sprites.push(sprite);
        }
    };

}