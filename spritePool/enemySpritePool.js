import {SpritePool} from "./spritePool.js";
import {EnemyStateEnum} from "../GeneralEnums.js";
import {GlobalConfig,resources} from "../Configuration.js";

export class EnemySpritesPool extends SpritePool {

    walkingTextures = [];
    dyingTextures = [];

    constructor(spriteAmount= 5) {
        super();
        this.sprites[EnemyStateEnum.MOVE_LEFT]=[];
        this.sprites[EnemyStateEnum.MOVE_RIGHT]=[];
        this.sprites[EnemyStateEnum.DISAPPEAR]=[];
        this.walkingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-0.png"]);
        this.walkingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-1.png"]);
        this.walkingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-2.png"]);
        this.dyingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-fade-0.png"]);
        this.dyingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-fade-1.png"]);
        this.dyingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-fade-2.png"]);
        this.dyingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-fade-3.png"]);
        this.dyingTextures.push(resources["images/game/game.json"].spritesheet.textures["enemy-fade-4.png"]);
        this.addEnemySprites(spriteAmount);
    }

    addEnemySprites(amount) {
        for (let i = 0; i < amount; i++)
        {
            //left
            let  sprite = new PIXI.AnimatedSprite(this.walkingTextures);
            sprite.animationSpeed = 0.2;
            this.applyCommonSpriteSettings(sprite,false);
            sprite.customState= EnemyStateEnum.MOVE_LEFT;//custom field
            this.sprites[EnemyStateEnum.MOVE_LEFT].push(sprite);

            //right
            sprite = new PIXI.AnimatedSprite(this.walkingTextures);
            sprite.animationSpeed = 0.2;
            this.applyCommonSpriteSettings(sprite,true);
            sprite.customState= EnemyStateEnum.MOVE_RIGHT;//custom field
            this.sprites[EnemyStateEnum.MOVE_RIGHT].push(sprite);

            //disappear
            sprite = new PIXI.AnimatedSprite(this.dyingTextures);
            sprite.animationSpeed = 0.2;
            this.applyCommonSpriteSettings(sprite,false);
            sprite.customState= EnemyStateEnum.DISAPPEAR;//custom field
            this.sprites[EnemyStateEnum.DISAPPEAR].push(sprite);


        }
    };

    /**
     *
     * @param sprite {PIXI.Sprite}
     * @param flipLeft {Boolean}
     */
    applyCommonSpriteSettings(sprite, flipLeft=false){
        sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
        sprite.width = flipLeft?-1*GlobalConfig.entities.enemy.width:GlobalConfig.entities.enemy.width;
        sprite.height = GlobalConfig.entities.enemy.height;
        sprite.anchor.x=0.5;
        sprite.anchor.y=0.5;
    }
}