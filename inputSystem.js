class InputSystem {

    engine = undefined;//matter engine
    entitiesManager = undefined;//EntitiesManager

    constructor(entitiesManager, engine) {
        this.engine = engine;
        this.entitiesManager = entitiesManager;

        this.init();
    }

    update(){
        //try basic
        //up
        // press
        if(this.up.isDown&&this.up.semaphoreDown){
            console.log("pressed up");
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            // if (playerEntity.body.velocity.y > 0.8) return;
            if (playerEntity.body.velocity.y  <0.2 && playerEntity.body.velocity.y  > -0.2)
                Body.setVelocity(playerEntity.body, {x: playerEntity.body.velocity.x, y: -12});
            if(!this.up.allowPressed) this.up.semaphoreDown=false;
            this.up.semaphoreUp=true;
        }
        //release
        if(this.up.isUp&&this.up.semaphoreUp){
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: playerEntity.body.velocity.x, y: playerEntity.body.velocity.y/2});
            this.up.semaphoreUp=false;
            this.up.semaphoreDown=true;
        }

        //right
        // press
        if(this.right.isDown&&this.right.semaphoreDown){
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: 4, y: playerEntity.body.velocity.y});
            if (playerEntity.sprite) {
                playerEntity.sprite.scale.x = Math.abs(playerEntity.sprite.scale.x);
                playerEntity.sprite.play();
            }
            if(!this.right.allowPressed) this.up.semaphoreDown=false;
            this.right.semaphoreUp=true;
        }
        //release
        if(this.right.isUp&&this.right.semaphoreUp){
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: 0, y: playerEntity.body.velocity.y});
            if (playerEntity.sprite) {
                playerEntity.sprite.stop();
            }
            this.right.semaphoreUp=false;
        }

        //left
        // press
        if(this.left.isDown&&this.left.semaphoreDown){
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: -4, y: playerEntity.body.velocity.y});
            if (playerEntity.sprite) {
                playerEntity.sprite.scale.x = Math.abs(playerEntity.sprite.scale.x) * -1;
                playerEntity.sprite.play();
            }
            if(!this.left.allowPressed) this.up.semaphoreDown=false;
            this.left.semaphoreUp=true;
        }
        //release
        if(this.left.isUp&&this.left.semaphoreUp){
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            Body.setVelocity(playerEntity.body, {x: 0, y: playerEntity.body.velocity.y});
            if (playerEntity.sprite) {
                playerEntity.sprite.stop();
            }
            this.left.semaphoreUp=false;
        }

        //n key
        // press
        if(this.keyN.isDown&&this.keyN.semaphoreDown){
            let playerEntity = this.entitiesManager.getPlayerEntities()[0];
            let bullet = Bodies.rectangle(playerEntity.body.bounds.max.x + 50, playerEntity.body.position.y - 10, 14, 6, {
                restitution: 0,
                friction: 0,
                frictionAir: 0
            });
            Body.setVelocity(bullet, {x: 6, y: 0});

            bullet.customType = 'BULLET';
            let bulletEntity = new BulletEntity();
            bulletEntity.body = bullet;
            this.entitiesManager.addBulletEntity(bulletEntity);

            World.add(this.engine.world, bullet);
            if(!this.left.allowPressed) this.up.semaphoreDown=false;
            this.left.semaphoreUp=true;
        }
        //release  - non

    }
    init() {
        this.up = this.keyboard("ArrowUp", false);
        this.right = this.keyboard("ArrowRight");
        this.left = this.keyboard("ArrowLeft");
        this.keyN = this.keyboard("n");

        //Up
        // up.press = () => {
        //     let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        //     // if (playerEntity.body.velocity.y > 0.8) return;
        //     if (playerEntity.body.velocity.y  <0.2 && playerEntity.body.velocity.y  > -0.2)
        //         Body.setVelocity(playerEntity.body, {x: playerEntity.body.velocity.x, y: -6});
        // };
        // up.release = () => {
        //     let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        //     Body.setVelocity(playerEntity.body, {x: playerEntity.body.velocity.x, y: playerEntity.body.velocity.y / 2});
        // };

        //right
        // right.press = () => {
        //     let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        //     Body.setVelocity(playerEntity.body, {x: 2, y: playerEntity.body.velocity.y});
        //     if (playerEntity.sprite) {
        //         playerEntity.sprite.scale.x = Math.abs(playerEntity.sprite.scale.x);
        //         // playerEntity.sprite.play();
        //     }
        // };
        // right.release = () => {
        //     let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        //     Body.setVelocity(playerEntity.body, {x: 0, y: playerEntity.body.velocity.y});
        //     if (playerEntity.sprite) {
        //         // playerEntity.sprite.stop();
        //     }
        // };

        //left
        // left.press = () => {
        //     let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        //     Body.setVelocity(playerEntity.body, {x: -2, y: playerEntity.body.velocity.y});
        //     if (playerEntity.sprite) {
        //         playerEntity.sprite.scale.x = Math.abs(playerEntity.sprite.scale.x) * -1;
        //         // playerEntity.sprite.play();
        //     }
        // };
        // left.release = () => {
        //     let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        //     Body.setVelocity(playerEntity.body, {x: 0, y: playerEntity.body.velocity.y});
        //     if (playerEntity.sprite) {
        //         // playerEntity.sprite.stop();
        //     }
        // };

        //D
        // keyD.press = () => {
        //     var px = wall.position.x + 10
        //     //  Body.setVelocity(wall, { x: px - wall.position.x , y: 0 });
        //     Body.setPosition(wall, {x: px, y: wall.position.y});
        //
        // };
        // keyD.release = () => {
        //
        // };

        //N
        // keyN.press = () => {
        //     let playerEntity = this.entitiesManager.getPlayerEntities()[0];
        //     let bullet = Bodies.rectangle(playerEntity.body.bounds.max.x + 15, playerEntity.body.position.y - 10, 14, 6, {
        //         restitution: 0,
        //         friction: 0,
        //         frictionAir: 0
        //     });
        //     Body.setVelocity(bullet, {x: 3, y: 0});
        //
        //     bullet.customType = 'BULLET';
        //     let bulletEntity = new BulletEntity();
        //     bulletEntity.body = bullet;
        //     this.entitiesManager.addBulletEntity(bulletEntity);
        //
        //     World.add(this.engine.world, bullet);
        //
        // };
        // keyN.release = () => {
        //
        // };

    }

    keyboard(value, allowPressed = true) {
        let key = {};
        key.value = value;
        key.allowPressed=allowPressed;

        key.isDown = false;
        key.semaphoreDown=true,
        key.isUp = true;
        key.semaphoreUp=true,

        key.press = undefined;
        key.release = undefined;

        let timer;
        //The `downHandler`
        key.downHandler = event => {
            if (event.key === key.value) {
                // if (allowPressed) {
                //     if (timer == undefined && key.press) {
                //         key.press();//key.isUp &&
                //         timer = setInterval(key.press, 100);
                //     }
                // } else if (key.isUp && key.press) {
                //     key.press();
                // }
                    key.isDown = true;
                    key.isUp = false;
                event.preventDefault();
            }
        };

        //The `upHandler`
        key.upHandler = event => {
            if (event.key === key.value) {
                // if (key.release) key.release();//key.isDown
                    key.isDown = false;
                    key.isUp = true;
                // clearInterval(timer);
                // timer = undefined;
                event.preventDefault();
            }
        };

        //Attach event listeners
        const downListener = key.downHandler.bind(key);
        const upListener = key.upHandler.bind(key);

        window.addEventListener(
            "keydown", downListener, false
        );
        window.addEventListener(
            "keyup", upListener, false
        );

        // Detach event listeners
        key.unsubscribe = () => {
            window.removeEventListener("keydown", downListener);
            window.removeEventListener("keyup", upListener);
        };

        return key;
    }


}