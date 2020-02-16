import {SpritePool} from "./spritePool.js";
import {GenericStateEnum} from "../GeneralEnums.js";
import {GlobalConfig, resources, Sprite} from "../Configuration.js";

export class BigBrickSpritesPool extends SpritePool {

    constructor(spriteAmount = 10) {
        super();
        this.addBigBrickSprites(spriteAmount,"images/game/game.json");
    }

    addBigBrickSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sprite = new Sprite(resources[resourceId].spritesheet.textures["big-brick-grey.png"]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width = GlobalConfig.entities.bigBrick.width;
            sprite.height = GlobalConfig.entities.bigBrick.height;
            sprite.anchor.x=0.5;
            sprite.anchor.y=0.5;
            sprite.customState= GenericStateEnum.DEFAULT;//custom field
            this.sprites[GenericStateEnum.DEFAULT].push(sprite);
        }
    };

}