import superagent from 'superagent';

class MovieService {
    constructor(apiURL, apiKey) {
        this.apiURL = apiURL;
        this.apiKey = apiKey;
    }

    /**
     *
     * @param t
     * @returns {Request}
     */
    lookupMovie(t) {
        return new Promise((resolve,reject) => {
            return superagent
                .get(this.apiURL,)
                .set('Accept', 'application/json')
                .query({
                    'apikey': this.apiKey,
                    t
                })
                .end((error,response) => {
                    const movieDetails = response.body;
                    if (error) reject();
                    if (movieDetails.Response && movieDetails.Response === "False") reject("Movie not found");
                    resolve({
                        cast: movieDetails.Actors,
                        title: movieDetails.Title,
                        description: movieDetails.Plot,
                        year: movieDetails.Year,
                        director: movieDetails.Director,
                        id: movieDetails.imdbID,
                        poster: movieDetails.Poster
                    });
                })
        });
    }
}

export default MovieService;