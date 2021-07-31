import {DomListener} from "./DomListener";

export class ExcelComponents extends DomListener {
    constructor($root, options = []) {
        super($root, options.listeners);
        this.name = options.name;
    }
    /**
  * Возращает шаблон компонента
  * @return {string}
  */
    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners();
    }

    destroy() {
        this.removeDOMListeners();
    }
}
