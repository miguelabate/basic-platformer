/**
 * Singleton service that maitains the state of the world and provides methods to add and query bodies in it
 */
import {bodyFactory} from './BodyFactory.js';
import {GlobalConfig} from "./Configuration.js";
import {BearingEnum} from "./GeneralEnums.js";
import {World} from "./Configuration.js";

export class WorldStateService {

    entitiesManager = undefined;//entities manager
    world = undefined;//matter js world
    engine=  undefined;

    constructor(entitiesManager) {
        this.entitiesManager = entitiesManager;
        this.engine = Matter.Engine.create();
        this.engine.world.gravity.y = GlobalConfig.physics.gravity;
        this.world = this.engine.world;
    }


    isPlayerOnTheGround() {
        let allBodies = this.world.bodies;//TODO:optimize, only get bodies that are floor or related
        let playerBody  = this.entitiesManager.getPlayerEntities()[0].body;
        let playerLowerMinX = playerBody.bounds.min.x;
        let playerLowerMaxX = playerBody.bounds.max.x;
        let playerLowerY = playerBody.bounds.max.y; //take lower left point of the player, enough for now to check contact

        //this method can be optimized, stop when reaches 2
        return Matter.Query.region(allBodies,{min:{x:playerLowerMinX,y:playerLowerY},max:{x:playerLowerMaxX,y:playerLowerY+5}},false).length>1;
    }

    /**
     * adds a matter body to bullet entity and adds the body to the world
     * @param bulletEntity
     */
    addBulletBodyToEntity(bulletEntity) {
        let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        let bulletBody;

        if(playerEntity.bearing === BearingEnum.RIGHT) {
            bulletBody = bodyFactory.createBullet(playerEntity.body.bounds.max.x + 30, playerEntity.body.position.y - 10);//TODO: continue here, make this a module bodyFActory
            bulletEntity.bearing = BearingEnum.RIGHT;
        }else{
            bulletBody = bodyFactory.createBullet(playerEntity.body.bounds.min.x - 30, playerEntity.body.position.y - 10);
            bulletEntity.bearing = BearingEnum.LEFT;
        }

        bulletEntity.body = bulletBody;
        World.add(this.world, bulletBody);
    }

    /**
     * Removes a bullet body (matterjs) from the BulletEntity that matches bodyID. and removes it from world
     * @param bodyId Id of thebody given by Matterjs
     */
    removeBulletBodyFromEntitiesList(bodyId){
        let listEntities = this.entitiesManager.getBulletEntities();
        for(let i=listEntities.length-1;i>=0;i--){
            if(listEntities[i].body&&listEntities[i].body.id===bodyId){
                World.remove(this.world, listEntities[i].body);
                delete listEntities[i].body
            }
        }
    }
}