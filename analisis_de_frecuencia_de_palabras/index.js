import { countWords } from "./fileReaderService.js";

const contWords = countWords("prueba.txt");

const top10Words = Object.entries(contWords)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

console.log("Top 10 palabras más frecuentes:");

for (let index = 0; index < top10Words.length; index++) {
    console.log(`${index + 1}. ${top10Words[index][0]}: ${top10Words[index][1]} veces`);   
}