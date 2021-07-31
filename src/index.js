import "./scss/index.scss"
import {Excel} from "@/componets/excel/Excel";
import {Header} from "@/componets/header/Header";
import {Toolbar} from "@/componets/toolbar/Toolbar";
import {Formula} from "@/componets/formula/Formula";
import {Table} from "@/componets/table/Table";

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table]
})

excel.render();
