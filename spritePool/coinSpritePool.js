class CoinSpritesPool extends SpritePool {
    _rotateTextures= [];
    _disappearTextures= [];

    constructor() {
        super();
        this.sprites[CoinStateEnum.ROTATE]=[];
        this.sprites[CoinStateEnum.DISAPPEAR]=[];
        this._rotateTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-0.png"]);
        this._rotateTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-1.png"]);
        this._rotateTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-2.png"]);
        this._rotateTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-3.png"]);
        this._disappearTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-fade-0.png"]);
        this._disappearTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-fade-1.png"]);
        this._disappearTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-fade-2.png"]);
        this._disappearTextures.push(resources["images/game/game.json"].spritesheet.textures["coin-fade-3.png"]);
        this.addCoinSprites(5);
    }

    addCoinSprites(amount) {
        for (var i = 0; i < amount; i++)
        {
            let  sprite = new PIXI.AnimatedSprite(this._rotateTextures);
            sprite.animationSpeed = 0.2;
            this.applyCommonSpriteSettings(sprite);
            sprite.customState= CoinStateEnum.ROTATE;//custom field
            this.sprites[CoinStateEnum.ROTATE].push(sprite);

            sprite = new PIXI.AnimatedSprite(this._disappearTextures);
            sprite.animationSpeed = 0.1;
            this.applyCommonSpriteSettings(sprite);
            sprite.customState= CoinStateEnum.DISAPPEAR;//custom field
            this.sprites[CoinStateEnum.DISAPPEAR].push(sprite);
        }
    };
    /**
     *
     * @param sprite {PIXI.Sprite}
     * @param flipLeft {Boolean}
     */
    applyCommonSpriteSettings(sprite, flipLeft=false){
        sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        sprite.width=GlobalConfig.entities.coin.width;
        sprite.height=GlobalConfig.entities.coin.height;
        sprite.anchor.x=0.5;
        sprite.anchor.y=0.5;
    }
}