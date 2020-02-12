//// State /////
const GenericStateEnum = {DEFAULT:"DEFAULT", TO_REMOVE:"TO_REMOVE"};
Object.freeze(GenericStateEnum);

const PlayerStateEnum = {REST_LEFT:"REST_LEFT",REST_RIGHT:"REST_RIGHT",MOVE_LEFT:"MOVE_LEFT", MOVE_RIGHT:"MOVE_RIGHT", JUMP_RIGHT:"JUMP_RIGHT",JUMP_LEFT:"JUMP_LEFT"};
Object.freeze(PlayerStateEnum);

const EnemyStateEnum = {MOVE_LEFT:"MOVE_LEFT", MOVE_RIGHT:"MOVE_RIGHT", DISAPPEAR:"ENEMY_DISAPPEAR"};
Object.freeze(EnemyStateEnum);

const CoinStateEnum = {ROTATE:"ROTATE", DISAPPEAR:"DISAPPEAR"};
Object.freeze(CoinStateEnum);

const BulletStateEnum = {MOVING:"MOVING"};
Object.freeze(BulletStateEnum);

//// Bearing ////
const BearingEnum = {LEFT:"LEFT", RIGHT:"RIGHT"};
Object.freeze(BearingEnum);
