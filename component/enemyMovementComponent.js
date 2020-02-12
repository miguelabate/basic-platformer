class EnemyMovementComponent {

    constructor()  {
        this._seed=Math.random();
    }
    move(entity, engine) {
        if( entity.state.getState() !== EnemyStateEnum.DISAPPEAR &&entity.state.getState() !== GenericStateEnum.TO_REMOVE) {//only move when not disappearing
            //do some movement for the enemy
            let vy = entity.body.velocity.y;
            if (Math.random() < 0.01) { //1 in 100 times jump
                vy -= 6;
            }
            let vx = 2 * Math.sin(engine.timing.timestamp * 0.0005 *  this._seed);
            Body.setVelocity(entity.body, {x: vx, y: vy});
            if (vx < 0) {
                entity.bearing = BearingEnum.LEFT;
                entity.state.setState(EnemyStateEnum.MOVE_LEFT);
            } else {
                entity.bearing = BearingEnum.RIGHT;
                entity.state.setState(EnemyStateEnum.MOVE_RIGHT);
            }
            //set the state of the body, so it's picked by other systems
        }
    }

}