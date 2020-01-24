class MovementComponent {

    engine=undefined;

    constructor(engine) {
        this.engine = engine;
    }

    move(body) {
        var px = 200 + 100 * Math.sin(this.engine.timing.timestamp * 0.001);
        Body.setVelocity(body, { x: 5 * Math.sin(this.engine.timing.timestamp * 0.005) , y: body.velocity.y });
         // Body.setPosition(body, { x: px, y:  body.position.y});
    }

}