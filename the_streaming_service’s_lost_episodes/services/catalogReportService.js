import fs from 'fs';

function generateCatalogReport(fileName, builder) {
    const report = "# Report for Catalog\n" +
        "Total inputs: " + builder.totalInputs + "\n \n" +
        "Total outputs: " + builder.totalOutputs + "\n \n" +
        "Discarded entries: " + builder.discardedEntries + "\n\n" +
        "Corrected entries: " + builder.correctedEntries + "\n\n" +
        "Duplicates detected: " + builder.duplicatesDetected + "\n\n" +
        "### Deduplication strategies: \n\n" + builder.deduplicationStretegies.map(
            strategy => `\n\nExisting: 
            ${JSON.stringify(strategy.existing)},\n\n New: ${JSON.stringify(strategy.new)}\n\n ---`).join('\n');

    fs.writeFileSync(fileName, report, 'utf-8');
    

}

export { generateCatalogReport };