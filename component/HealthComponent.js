export class HealthComponent {

    _maxHealth=undefined;
    _currentHealth=undefined;

    constructor(healthAmount) {
        this._maxHealth = healthAmount;
        this._currentHealth = healthAmount;
    }

    setHealth(health){
        this._currentHealth = health;
    }

    addHealth(healthDelta){
        this._currentHealth += healthDelta;//TODO: maybe add some checks to limit by maxHealth
    }

    decreaseHealth(healthDelta){
        this._currentHealth -= healthDelta;//TODO: maybe add some checks to limit by maxHealth
    }
    getHealth(){
        return this._currentHealth;
    }



}