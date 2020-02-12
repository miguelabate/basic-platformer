/**
 * Singleton service that maintains the state of the game
 */
class GameStateService {

    _gameIsPlaying = true;

    constructor() {
    }

    getGameIsPlaying(){
        return this._gameIsPlaying;
    }

    setGameIsPlaying(gameIsPlaying){
        return this._gameIsPlaying = gameIsPlaying;
    }
}