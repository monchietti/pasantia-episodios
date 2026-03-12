import fs from 'fs';

function countWords(file) {
    const text = fs.readFileSync(file, 'utf-8');
    const formattedText = formatText(text);
    const words = formattedText.split(/\s+/).filter(word => word.length > 0);
    const wordCount = {};
    words.forEach(word => {
        if(!wordCount[word]) {
            wordCount[word] = 1;
        } else {
            wordCount[word]++;
        }
    });
    return wordCount;
}


/*Pasa todo a minuscula y todo lo que no sea una letra lo elimina*/
function formatText(text) {
    return text.toLowerCase()
    .replace(/[^a-záéíóúüñ\s]/gi, " ");

}

export { countWords };
