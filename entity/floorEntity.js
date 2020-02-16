import {GlobalConfig} from "../Configuration.js";
import {StateComponent} from "../component/stateComponent.js";
import {GenericStateEnum} from "../GeneralEnums.js";

export class FloorEntity {

    type=GlobalConfig.entities.floorThin.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    state=new StateComponent(GenericStateEnum.DEFAULT);

    constructor() {
    }

}