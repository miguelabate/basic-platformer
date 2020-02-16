export class MaintenanceSystem {

    entitiesManager = undefined;//entities manager

    constructor(entitiesmanager) {
        this.entitiesManager = entitiesmanager;
    }

    update() {
        this.entitiesManager.removeEntitiesWithoutBodyFromAll();
    }

}