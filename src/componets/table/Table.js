import {ExcelComponents} from "@core/ExcelComponents";
import {createTable} from "@/componets/table/table.template";

export class Table extends ExcelComponents {
  static className = 'excel__table';

  toHTML() {
      return createTable(20);
  }
}
