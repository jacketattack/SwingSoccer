/**
 * Goal of this class is to register eventListeners for specific
 * keyCodes on the keyboard and then call the specific handler functions
 * for the object this keyboard is bound to.
 */
class Keyboard {

    constructor(config) {
        this.keyCode = config.keyCode;
        this.keyIsDown = false;
        this.keyIsUp = true;
        this.press = config.controllerObject.press.bind(config.controllerObject);
        this.release = config.controllerObject.release.bind(config.controllerObject);
    }

    delegateEvents() {
        window.addEventListener('keydown', this.downHandler.bind(this));
        window.addEventListener('keyup', this.upHandler.bind(this));
    }

    undelegateEvents() {
        window.removeEventListener('keydown', this.downHandler.bind(this));
        window.removeEventListener('keyup', this.upHandler.bind(this));
    }

    downHandler(event) {
        if (event.keyCode == this.keyCode) {
            if (this.keyIsUp && this.controllerObject.press) {
                this.press();
            }

            this.keyIsDown = true;
            this.keyIsUp = false;
        }
        event.preventDefault();
    }

    upHandler(event) {
        if (event.keyCode == this.keyCode) {
            if (this.keyIsDown && this.controllerObject.release) {
                this.release();
            }
            this.keyIsDown = false;
            this.keyIsUp = true;
        }
        event.preventDefault();
    }
}
