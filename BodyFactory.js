import {GlobalConfig,Bodies,Body} from "./Configuration.js";

export class BodyFactory {

    categoriesFilter = {COIN: 0x0002, PLAYER: 0x0008, ENEMY: 0x0004, BULLET: 0x0010};

    createBullet(x, y) {
        let body = Bodies.rectangle(x, y, GlobalConfig.entities.bullet.width, GlobalConfig.entities.bullet.height, {
            restitution: 0,
            friction: 0,
            frictionAir: 0,
            collisionFilter: {category: this.categoriesFilter.BULLET, mask: ~this.categoriesFilter.COIN}//do not collide with coins
        });
        body.customType = GlobalConfig.entities.bullet.type;
        return body;
    }
   createFloorThin (x, y) {
        let body = Bodies.rectangle(x, y, GlobalConfig.entities.floorThin.width, GlobalConfig.entities.floorThin.height, {
            isStatic: true,
            friction: 0
        });
        body.customType = GlobalConfig.entities.floorThin.type;
        return body;
    }

    createFloorWTree(x, y) {
        let body = Bodies.rectangle(x, y, GlobalConfig.entities.floorWTree.body.width, GlobalConfig.entities.floorWTree.body.height, {
            isStatic: true,
            friction: 0
        });
        body.customType = GlobalConfig.entities.floorWTree.type;
        return body;
    }

    createPlayer(x, y) {
        let body = Bodies.rectangle(x, y, GlobalConfig.entities.player.width, GlobalConfig.entities.player.height, {
            restitution: 0,
            friction: 0,
            frictionAir: 0,
            frictionStatic: 0,
            collisionFilter: {category: this.categoriesFilter.PLAYER}
        });
        Body.setInertia(body, Infinity);//lock rotation for dude
        body.customType = GlobalConfig.entities.player.type;
        return body;
    }

    createEnemy(x, y) {
        let body = Bodies.rectangle(x, y, 64, 64, {
            collisionFilter: {
                category: this.categoriesFilter.ENEMY,
                mask: ~this.categoriesFilter.COIN
            }
        });//do not collide with coins
        Body.setInertia(body, Infinity);//lock rotation for dude
        body.customType = GlobalConfig.entities.enemy.type;
        return body;
    }

    createCoin(x, y) {
        let body = Bodies.rectangle(x, y, 32, 32, {
            isStatic: true,
            isSensor: true,
            collisionFilter: {category: this.categoriesFilter.COIN}
        });
        body.customType = GlobalConfig.entities.coin.type;
        return body;
    }

    createBigBrick(x, y) {
        let body = Bodies.rectangle(x, y, GlobalConfig.entities.bigBrick.width, GlobalConfig.entities.bigBrick.height, {
            isStatic: true,
            friction: 0.3
        });
        body.customType = GlobalConfig.entities.bigBrick.type;
        return body;
    }
}