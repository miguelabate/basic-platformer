import {GlobalConfig} from "../Configuration.js";
import {StateComponent} from "../component/stateComponent.js";
import {HealthComponent} from "../component/HealthComponent.js";
import {BearingEnum, PlayerStateEnum} from "../GeneralEnums.js";

export class PlayerEntity {

    type=GlobalConfig.entities.player.type;
    body={};//Matter Body
    sprite=undefined;// Pixi Sprite
    existsOutsideViewPort=true;
    state= new StateComponent(PlayerStateEnum.REST_RIGHT);
    bearing=BearingEnum.RIGHT;
    health = new HealthComponent(100);

    constructor() {
    }

}