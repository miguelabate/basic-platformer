class EnemyEntity {

    type = GlobalConfig.entities.enemy.type;
    body = undefined;//Matter Body
    sprite = undefined;// Pixi Sprite
    existsOutsideViewPort = true;
    selfMovement = undefined;
    state=new StateComponent(EnemyStateEnum.MOVE_RIGHT);

    constructor() {
    }
}