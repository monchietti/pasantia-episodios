function normalize(text) {
    return text.trim().toLowerCase().replace(/\s/g, ' ');
}

function isValidInteger(value) {
    const parsed = parseInt(value);
    // NaN, decimales (3.5), notación extraña (--2) → false
    return !isNaN(parsed) && parsed.toString() === value.toString().trim();
}

function isValidDate(dateString) {
    if (!dateString || dateString.trim() === "") return false;
    
    // en base a esta expresion regular valida si existe o no algo como YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if(regex.test(dateString)){
        const dateList = dateString.split("-")
        const year = parseInt(dateList[0]);
        const month = parseInt(dateList[1]);
        const day = parseInt(dateList[2]);
        const result = month >= 1 && month <= 12 && day >= 1 && day <= 31;
        console.log(`Validating date: ${dateString} → Year: ${year}, Month: ${month}, Day: ${day} → Valid: ${result}`);
        return month >= 1 && month <= 12 && day >= 1 && day <= 31; // validación básica de mes y día
    }
    return false;
}

export { normalize, isValidInteger, isValidDate };