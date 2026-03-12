import { CatalogBuilder } from "./services/catalogBuilder.js"
import {readCSV, writeCSV} from "./services/csvService.js";
import {generateCatalogReport} from "./services/catalogReportService.js";

const builder = new CatalogBuilder(); 
console.log(readCSV('./data/test_input.csv'));
const catalog = builder.createCatalog(readCSV('./data/test_input.csv'));

console.log('Generating CSV file with cleaned catalog...');
writeCSV('./data/episodes_clean.csv', [...catalog])

console.log('Generating report...');
generateCatalogReport('./reports/report.md', builder);

console.log('Process completed. Check the generated CSV and report files.');
/*
setCatalog.forEach(episode => {
    console.table(episode);
});
*/