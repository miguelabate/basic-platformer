class EnemyMovementComponent {

    move(entity, engine) {
        //do some movement for the enemy
        let vy=entity.body.velocity.y;
        if(Math.random() <0.01){ //1 in 100 times jump
            vy-=6;
        }
        Body.setVelocity(entity.body, { x: 2 * Math.sin(engine.timing.timestamp * 0.0005) , y:vy});
        //set the state of the body, so it's picked by other systems
    }

}