class PlayerSpritesPool extends SpritePool {

    walkingTextures = [];
    restTextures = [];
    jumpTextures = [];

    constructor() {
        super();
        this.sprites[PlayerStateEnum.MOVE_LEFT]=[];
        this.sprites[PlayerStateEnum.MOVE_RIGHT]=[];
        this.sprites[PlayerStateEnum.JUMP_LEFT]=[];
        this.sprites[PlayerStateEnum.JUMP_RIGHT]=[];
        this.sprites[PlayerStateEnum.REST_LEFT]=[];
        this.sprites[PlayerStateEnum.REST_RIGHT]=[];
        this.restTextures.push(resources["images/game/game.json"].spritesheet.textures["player-rest.png"]);
        this.walkingTextures.push(resources["images/game/game.json"].spritesheet.textures["player-walk-1.png"]);
        this.walkingTextures.push(resources["images/game/game.json"].spritesheet.textures["player-walk-2.png"]);
        this.walkingTextures.push(resources["images/game/game.json"].spritesheet.textures["player-walk-3.png"]);
        this.jumpTextures.push(resources["images/game/game.json"].spritesheet.textures["player-jump.png"]);
        this.addPlayerSprites(1);
    }

    addPlayerSprites(amount) {
        for (var i = 0; i < amount; i++)
        {
            //left
            let  sprite = new PIXI.AnimatedSprite(this.walkingTextures);
            sprite.animationSpeed = 0.2;
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x =4;
            sprite.scale.y =4;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.scale.x=sprite.scale.x*-1;
            sprite.customState= PlayerStateEnum.MOVE_LEFT;//custom field
            this.sprites[PlayerStateEnum.MOVE_LEFT].push(sprite);

            //right
            sprite = new PIXI.AnimatedSprite(this.walkingTextures);
            sprite.animationSpeed = 0.2;
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x =4;
            sprite.scale.y =4;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= PlayerStateEnum.MOVE_RIGHT;//custom field
            this.sprites[PlayerStateEnum.MOVE_RIGHT].push(sprite);

            //jump right
            sprite = new Sprite(this.jumpTextures[0]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x =4;
            sprite.scale.y =4;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= PlayerStateEnum.JUMP_RIGHT;//custom field
            this.sprites[PlayerStateEnum.JUMP_RIGHT].push(sprite);

            //jump left
            sprite = new Sprite(this.jumpTextures[0]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x =4;
            sprite.scale.y =4;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.scale.x=sprite.scale.x*-1;
            sprite.customState= PlayerStateEnum.JUMP_LEFT;//custom field
            this.sprites[PlayerStateEnum.JUMP_LEFT].push(sprite);

            //rest right
            sprite = new Sprite(this.restTextures[0]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x =4;
            sprite.scale.y =4;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= PlayerStateEnum.REST_RIGHT;//custom field
            this.sprites[PlayerStateEnum.REST_RIGHT].push(sprite);

            //rest left
            sprite = new Sprite(this.restTextures[0]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.scale.x =4;
            sprite.scale.y =4;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.scale.x=sprite.scale.x*-1;
            sprite.customState= PlayerStateEnum.REST_LEFT;//custom field
            this.sprites[PlayerStateEnum.REST_LEFT].push(sprite);
        }
    };

}