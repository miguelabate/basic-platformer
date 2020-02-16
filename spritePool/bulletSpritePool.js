import {SpritePool} from "./spritePool.js";
import {BulletStateEnum} from "../GeneralEnums.js";
import {GlobalConfig, Sprite, resources} from "../Configuration.js";

export class BulletSpritesPool extends SpritePool {

    constructor(spriteAmount = 20) {
        super();
        this.sprites[BulletStateEnum.MOVING]=[];
        this.addBulletSprites(spriteAmount,"images/game/game.json");
    }

    addBulletSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sprite = new Sprite(resources[resourceId].spritesheet.textures["bullet.png"]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width=GlobalConfig.entities.bullet.width;
            sprite.height=GlobalConfig.entities.bullet.height;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= BulletStateEnum.MOVING;//custom field
            this.sprites[BulletStateEnum.MOVING].push(sprite);
        }
    }

}