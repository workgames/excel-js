import {$} from "@core/dom";

export function resizeHandler($root, event) {
    const $resizer = $(event.target);
    // const $parent = $resizer.$el.parentNode; bad
    // const $parent = $resizer.$el.closest('.column') bad
    const $parent = $resizer.closest('[data-type="resizable"]')
    const cords = $parent.getCoords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    $resizer.css({ opacity: 1, [sideProp]: '-5000px' })
    let value;
    document.onmousemove = e => {
        if (type === 'col') {
            const delta = e.pageX - cords.right;
            value = cords.width + delta;
            $resizer.css({ right: -delta + 'px'})
        } else {
            const delta = e.pageY - cords.bottom;
            value = cords.height + delta;
            $resizer.css({ bottom: -delta + 'px'})
        }
    }
    document.onmouseup = () => {
        if (type === 'col') {
            const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

            $parent.css({
                width: value + 'px'
            });
            cells.forEach(el => {
                el.style.width = value + 'px';
            })
        } else {
            $parent.css({
                height: value + 'px'
            });
        }
        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.css({ opacity: 0, bottom: 0, right: 0 })
    }
}
