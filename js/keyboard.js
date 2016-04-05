/**
 * Goal of this class is to register eventListeners for specific
 * keyCodes on the keyboard and then call the specific handler functions
 * for the object this keyboard is bound to.
 */
class Keyboard {

    constructor(config) {
        this.keyCode = config.keyCode;
        this.controllerObject = config.controllerObject;
        window.addEventListener('keydown', this.downHandler.bind(this.controllerObject));
        window.addEventListener('keyup', this.downHandler.bind(this.controllerObject));
    }

    downHandler(event) {

    }
}
