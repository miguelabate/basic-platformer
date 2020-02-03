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
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width=32;
            sprite.height=32;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= CoinStateEnum.ROTATE;//custom field
            this.sprites[CoinStateEnum.ROTATE].push(sprite);

            sprite = new PIXI.AnimatedSprite(this._disappearTextures);
            sprite.animationSpeed = 0.1;
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width=32;
            sprite.height=32;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= CoinStateEnum.DISAPPEAR;//custom field
            this.sprites[CoinStateEnum.DISAPPEAR].push(sprite);
        }
    };

}