const GenericStateEnum = {"DEFAULT":"DEFAULT", "TO_REMOVE":"TO_REMOVE"};
Object.freeze(GenericStateEnum);

const PlayerStateEnum = {"REST_LEFT":"REST_LEFT","REST_RIGHT":"REST_RIGHT","MOVE_LEFT":"MOVE_LEFT", "MOVE_RIGHT":"MOVE_RIGHT", "JUMP_RIGHT":"JUMP_RIGHT","JUMP_LEFT":"JUMP_LEFT"};
Object.freeze(PlayerStateEnum);

const CoinStateEnum = {"ROTATE":"ROTATE", "DISAPPEAR":"DISAPPEAR"};
Object.freeze(CoinStateEnum);

const BulletStateEnum = {"MOVING":"MOVING", "BODY_MISSING":"BODY_MISSING"};
Object.freeze(BulletStateEnum);