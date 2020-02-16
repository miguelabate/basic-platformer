import {SpritePool} from "./spritePool.js";
import {GenericStateEnum} from "../GeneralEnums.js";
import {GlobalConfig, resources,Sprite} from "../Configuration.js";

export class FloorWTreeSpritesPool extends SpritePool {

    constructor(spriteAmount=2) {
        super();
        this.addFloorWTreeSprites(spriteAmount,"images/game/game.json");
    }

    addFloorWTreeSprites(amount, resourceId) {
        for (var i = 0; i < amount; i++)
        {
            let sprite = new Sprite(resources[resourceId].spritesheet.textures["ground-with-tree.png"]);
            sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
            sprite.width =GlobalConfig.entities.floorWTree.width;
            sprite.height =GlobalConfig.entities.floorWTree.height;
            sprite.anchor.x = GlobalConfig.entities.floorWTree.body.relX/GlobalConfig.entities.floorWTree.width;
            sprite.anchor.y = GlobalConfig.entities.floorWTree.body.relY/GlobalConfig.entities.floorWTree.height;
            sprite.customState= GenericStateEnum.DEFAULT;//custom field
            this.sprites[GenericStateEnum.DEFAULT].push(sprite);
        }
    };

}