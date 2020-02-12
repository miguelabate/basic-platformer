class StateComponent {

    _state=undefined;
    _timeChanged=undefined;//age of this state

    constructor(state) {
        this._state = state;
        this._timeChanged = performance.now();
    }

    setState(state){
        if(this._state === state) return;//if itś already set, do not reset timer
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