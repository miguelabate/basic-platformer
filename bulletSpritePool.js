class BulletSpritesPool extends SpritePool {

    constructor() {
        super();
        this.addBulletSprites(20,"images/bullet.png");
    }

    addBulletSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sprite = new Sprite(resources[resourceId].texture);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width=14;
            sprite.height=6;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;

            this.sprites.push(sprite);
        }
    };

}