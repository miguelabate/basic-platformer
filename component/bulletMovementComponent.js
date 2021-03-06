import {BearingEnum} from "../GeneralEnums.js";
import {GlobalConfig} from '../Configuration.js';
import {Body} from "../Configuration.js";

export class BulletMovementComponent {

    move(entity, engine) {
        let gravity = engine.world.gravity;
        if (entity.body) {
            if(entity.bearing===BearingEnum.RIGHT) {
                Body.setVelocity(entity.body, {x: GlobalConfig.physics.bulletSpeed, y: 0});
            }else{
                Body.setVelocity(entity.body, {x: -GlobalConfig.physics.bulletSpeed, y: 0});
            }
            //disalbe gravity
            Body.applyForce(entity.body, entity.body.position, {
                x: -gravity.x * gravity.scale * entity.body.mass,
                y: -gravity.y * gravity.scale * entity.body.mass
            });
        }
    }

}