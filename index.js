import { CatalogBuilder } from "./services/catalogBuilder.js"
import {readCSV, writeCSV} from "./services/csvService.js";
import {generateCatalogReport} from "./services/catalogReportService.js";

const builder = new CatalogBuilder(); 
console.log(readCSV('./data/test_input.csv'));
const catalog = builder.createCatalog(readCSV('./data/test_input.csv'));
//console.log(catalog);

const setCatalog = new Set();
catalog.forEach((episode, key) => {
    setCatalog.add(episode);
});

writeCSV('./data/episodes_clean.csv', [...setCatalog])

generateCatalogReport('./reports/report.md', builder);

/*
setCatalog.forEach(episode => {
    console.table(episode);
});
*/