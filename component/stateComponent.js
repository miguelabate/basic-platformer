class StateComponent {

    _state=undefined;
    _timeChanged=undefined;//age of this state

    constructor(state) {
        this._state = state;
        this._timeChanged = performance.now();
    }

    setState(state){
        this._state = state;
        this._timeChanged = performance.now();
    }

    getState(){
        return this._state;
    }

    getTimeChanged(){
        return this._timeChanged;
    }


}