import {capitalize} from "@core/utils";

export class DomListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provider for DomListener')
        }
        this.listeners = listeners;
        this.$root = $root;
    }

    initDOMListeners() {
        // console.log('listeners: ', this.listeners)
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name || ' '} Component`);
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method]);
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
