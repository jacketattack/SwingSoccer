/**
 * Goal of this class is to register eventListeners for specific
 * keyCodes on the keyboard and then call the specific handler functions
 * for the object this keyboard is bound to.
 */
function Keyboard(keyCode, controllerObject) {

    this.keyCode = keyCode;
    this.keyIsDown = false;
    this.keyIsUp = true;
    this.press = controllerObject.press.bind(controllerObject);
    this.release = controllerObject.release.bind(controllerObject);

    this.downHandler = function(event) {
        if (event.keyCode == this.keyCode) {
            if (this.keyIsUp && this.press) {
                this.press(this.keyCode);
            }

            this.keyIsDown = true;
            this.keyIsUp = false;
        }
        event.preventDefault();
    }

    this.upHandler = function(event) {
        if (event.keyCode == this.keyCode) {
            if (this.keyIsDown && this.release) {
                this.release(this.keyCode);
            }
            this.keyIsDown = false;
            this.keyIsUp = true;
        }
        event.preventDefault();
    }

    this.delegateEvents = function() {
        window.addEventListener('keydown', this.downHandler.bind(this));
        window.addEventListener('keyup', this.upHandler.bind(this));
    }

    this.undelegateEvents = function() {
        window.removeEventListener('keydown', this.downHandler.bind(this));
        window.removeEventListener('keyup', this.upHandler.bind(this));
    }

    this.delegateEvents();
}

module.exports = Keyboard;
