const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, col) {
    return `
     <div class="cell" data-col="${col}" contenteditable=""></div>
    `
}

function createCol(col, index) {
    return `
     <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div data-resize="col" class="col-resize"></div>
     </div>
    `
}

function createRow(index, content) {
    const resizer = index ? '<div data-resize="row" class="row-resize"></div>' : '';
    return `
    <div class="row" data-type="resizable">
         <div class="row-info">
            ${index ? index : ''}
            ${resizer}
         </div>
         <div class="row-data">${content}</div>
    </div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(createCol)
        .join('');

    rows.push(createRow(null, cols))

    for (let i= 0; i < rowsCount; i ++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('');

        rows.push(createRow(i + 1, cells))
    }

    return rows.join('');
}
