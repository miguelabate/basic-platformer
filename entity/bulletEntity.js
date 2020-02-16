import {GlobalConfig} from "../Configuration.js";
import {BearingEnum, GenericStateEnum} from "../GeneralEnums.js";
import {StateComponent} from "../component/stateComponent.js";
import {BulletMovementComponent} from "../component/bulletMovementComponent.js";

export class BulletEntity {

    type=GlobalConfig.entities.bullet.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=false;
    state = new StateComponent(GenericStateEnum.DEFAULT);
    selfMovement = new BulletMovementComponent();
    bearing=BearingEnum.RIGHT;

    constructor() {
    }

}