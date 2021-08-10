import {ExcelComponents} from "@core/ExcelComponents";
import {createTable} from "@/componets/table/table.template";
import {resizeHandler} from "@/componets/table/table.resize";
import {shouldResize} from "@/componets/table/table.functions";

export class Table extends ExcelComponents {
  static className = 'excel__table';

  constructor(root) {
      super(root, {
          name: 'Table',
          listeners: ['mousedown']
      });
  }

  onMousedown(event) {
      // console.log('onMousedown', event.target.getAttribute('data-resize'));
      // console.log('onMousedown', event.target.dataset);
      // eslint-disable-next-line no-empty
      if (shouldResize(event)) {
          resizeHandler(this.$root, event)
      }
  }

  toHTML() {
      return createTable(20);
  }
}
