import {GlobalConfig} from "../Configuration.js";

export class BackgroundEntity {

    type=GlobalConfig.entities.background.type;
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;

    constructor() {
    }

}