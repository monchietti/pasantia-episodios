import { normalize, isValidInteger, isValidDate } from "./normalizeService.js";
import {Episode} from "../models/Episode.js";
class CatalogBuilder {
    constructor() {
        this.totalInputs = 0;
        this.totalOutputs = 0;
        this.discardedEntries = 0;
        this.correctedEntries = 0;
        this.duplicatesDetected = 0;
        this.deduplicationStretegies = []
    }


    createCatalog(rows) {
        this.totalInputs = 0;
        this.totalOutputs = 0;
        this.discardedEntries = 0;
        this.correctedEntries = 0;
        this.duplicatesDetected = 0;

        this.totalInputs = rows.length;
        const catalog = new Map();
        for (const row of rows) {

            let seriesTitle = row[0];
            let seasonNumber = row[1];
            let episodeNumber = row[2];
            let episodeTitle = row[3];
            let episodeAirDate = row[4];

            //If missing or empty → discard the record (required to identify an episode)
            if (!seriesTitle) {
                console.warn('Serie title is missing, skipping row:', row);
                this.discardedEntries++;
                continue;
            }

            seriesTitle = normalize(seriesTitle);

            //If missing, empty, negative, or not a number → set to 0
            if (!isValidInteger(seasonNumber) || parseInt(seasonNumber) < 0) {
                console.warn('Invalid season number, setting to 0:', row);
                seasonNumber = 0;
                this.correctedEntries++
            }else{
                seasonNumber = parseInt(seasonNumber);
            }

            

            //If missing, empty, negative, or not a number → set to 0

            if (!isValidInteger(episodeNumber) || parseInt(episodeNumber) < 0) {
                console.warn('Invalid episode number, setting to 0:', row);
                episodeNumber = 0;
                this.correctedEntries++;
            }
            else {
                episodeNumber = parseInt(episodeNumber);
            }

            //If episode title ismissing or empty → replace with "Untitled Episode"
            if (!episodeTitle) {
                console.warn('Episode title is missing, setting to "Untitled Episode":', row);
                episodeTitle = 'Untitled Episode';
                this.correctedEntries++;
            }
            else {
                episodeTitle = normalize(episodeTitle);
            }

            //If date is missing, empty, or invalid → replace with "Unknown"
            if (!episodeAirDate || !isValidDate(episodeAirDate)) {
                console.warn('Episode air date is missing or invalid, setting to "Unknown":', row);
                episodeAirDate = 'Unknown';
                this.correctedEntries++;
            }
            else {
                episodeAirDate = normalize(episodeAirDate);
            }

            if (episodeAirDate === 'Unknown' && episodeNumber === 0 && episodeTitle === 'Untitled Episode') {
                console.warn('Episode has no identifiable information, skipping row:', row);
                this.discardedEntries++;
                continue;
            }

            const episode = new Episode(seriesTitle, seasonNumber, episodeNumber, episodeTitle, episodeAirDate);

            this.insertEpisode(catalog, episode);
        }

        this.totalOutputs = new Set(catalog.values()).size; // Solo contamos los valores únicos, no las claves

        return catalog;
    }


    getEpisodeKeys(series, season, episodeNum, title) {
        //en el mejor de los casos se generan 4 claves distintas, pero si faltan datos se generan menos claves 

        const keys = [];

        // Caso 1 – ambos conocidos
        if (season !== 0 && episodeNum !== 0) {
            keys.push(`${series}|${season}|${episodeNum}`);
        }

        // Caso 2 – season desconocida, pero tiene episodeNum y título
        if (episodeNum !== 0 && title !== 'Untitled Episode') {
            keys.push(`${series}|0|${episodeNum}|${title}`);
        }

        // Caso 3 – episodeNum desconocido, pero tiene season y título
        if (season !== 0 && title !== 'Untitled Episode') {
            keys.push(`${series}|${season}|0|${title}`);
        }

        // Caso extremo – ambos 0, solo título disponible
        if (keys.length === 0) {
            keys.push(`${series}|0|0|${title}`);
        }

        return keys;
    }

    insertEpisode(catalog, episode) {
        const keys = this.getEpisodeKeys(
            episode.series,
            episode.season,
            episode.number,
            episode.title
        );

        // Buscar si ya existe bajo alguna de sus claves
        let existing = null;
        for (const key of keys) {
            if (catalog.has(key)) {
                existing = catalog.get(key);
                break;
            }
        }

        if(existing){
            this.duplicatesDetected++;
        }
        //si no existe o el nuevo episodio es mejor, se reemplaza el existente
        const winner = (!existing || episode.isBetter(existing)) ? episode : existing;
        if (existing && episode.isBetter(existing)) {
            console.warn('Duplicate episode found. Replacing existing episode with better data:', {
                existing,
                new: episode
            });
            this.deduplicationStretegies.push(
                {existing: existing,
                new: episode}
                
            );
        }

        /* Registrar el ganador en todas las claves de ambos episodios 
        ya que pueden faltar claves si no tienen todos los datos y se eliminan los duplicados*/
        const allKeys = new Set([
            ...keys,
            ...(existing
                ? this.getEpisodeKeys(existing.series, existing.season, existing.episodeNumber, existing.title)
                : [])
        ]);

        //Para todas las claves posibles se registra el mejor episodio
        for (const key of allKeys) {
            catalog.set(key, winner);
        }
    }
}


export { CatalogBuilder };