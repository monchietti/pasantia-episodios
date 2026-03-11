class Episode {
    constructor(series, season, number, title, airDate) {
        this.series = series;
        this.season = season;
        this.number = number;
        this.title = title;
        this.airDate = airDate;
    }

    isBetter(other) {
    // 1. AirDate conocida > "Unknown"
    if (this.airDate !== 'Unknown' && other.airDate === 'Unknown') return true;
    if (this.airDate === 'Unknown' && other.airDate !== 'Unknown') return false;

    // 2. Título real > "Untitled Episode"
    if (this.title !== 'Untitled Episode' && other.title === 'Untitled Episode') return true;
    if (this.title === 'Untitled Episode' && other.title !== 'Untitled Episode') return false;

    // 3. Season conocida > 0
    if (this.season !== 0 && other.season === 0) return true;
    if (this.season === 0 && other.season !== 0) return false;

    // 4. EpisodeNumber conocido > 0
    if (this.episodeNum !== 0 && other.episodeNum === 0) return true;
    if (this.episodeNum === 0 && other.episodeNum !== 0) return false;

    // 5. Tie-break: primero en el archivo gana → no reemplazar
    return false;
    }
}

export { Episode };