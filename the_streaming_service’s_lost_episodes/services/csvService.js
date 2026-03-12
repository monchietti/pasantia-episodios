import fs from 'fs';
function readCSV(fileName) {
    const csv = fs.readFileSync(fileName, 'utf-8');
    const lines = csv.split('\n');
    const rows = lines.map(line => line.split(','));
    return rows;
}

function writeCSV(fileName, data) {
    const csv = data.map(episode => `${episode.series},${episode.season},${episode.number},${episode.title},${episode.airDate}`).join('\n');
    fs.writeFileSync(fileName, csv, 'utf-8');
}

export { readCSV, writeCSV };
