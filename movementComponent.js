class MovementComponent {

    engine=undefined;

    constructor(engine) {
        this.engine = engine;
    }

    move(body) {
        var px = 200 + 100 * Math.sin(this.engine.timing.timestamp * 0.001);
        //Body.setVelocity(body, { x: body.velocity.x , y: 10 * Math.sin(this.engine.timing.timestamp * 0.001) });
         Body.setPosition(body, { x: px, y:  body.position.y});
    }

}