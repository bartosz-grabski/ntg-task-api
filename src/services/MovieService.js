import superagent from 'superagent';
import debug from 'debug';
import Movie from '../db/model/Movie';

const log = debug('services-movie');

export const MovieServiceErrorCodes = {
  ERROR_FETCHING: 0,
  ERROR_NOT_FOUND: 1,
  ERROR_ALREADY_EXIST: 2,
  ERROR_SAVING: 3,
};

class MovieService {
  constructor(apiURL, apiKey) {
    this.apiURL = apiURL;
    this.apiKey = apiKey;
  }

  async getMovieInfo(id) {
    log(id);
    return new Promise((resolve, reject) => {
      Movie.findOne({ id }, (err, movie) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(movie);
      });
    });
  }

  lookupMovie(t) {
    return new Promise((resolve, reject) => superagent
      .get(this.apiURL)
      .set('Accept', 'application/json')
      .query({
        apikey: this.apiKey,
        t,
      })
      .end((error, response) => {
        const movieDetails = response.body;
        if (error) {
          log(error);
          reject({ code: MovieServiceErrorCodes.ERROR_FETCHING, msg: 'Error fetching results from API' });
          return;
        }

        if (movieDetails.Response && movieDetails.Response === 'False') reject({ code: MovieServiceErrorCodes.ERROR_NOT_FOUND, msg: `Did not find a movie for query - ${t}` });

        resolve({
          cast: movieDetails.Actors,
          title: movieDetails.Title,
          description: movieDetails.Plot,
          year: movieDetails.Year,
          director: movieDetails.Director,
          id: movieDetails.imdbID,
          poster: movieDetails.Poster,
        });
      }));
  }

  async getAllMovies() {
    return new Promise((resolve, reject) => {
      Movie.find({}, (err, movies) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(movies);
      });
    });
  }

  async saveMovie(movieDetails) {
    return new Promise((resolve, reject) => {
      new Movie(movieDetails).save((error) => {
        if (error) {
          log(error);
          if (error.code === 11000) {
            reject({ code: MovieServiceErrorCodes.ERROR_ALREADY_EXIST, msg: `Movie "${movieDetails.title}" already exists in the database` });
          } else {
            reject({ code: MovieServiceErrorCodes.ERROR_SAVING, msg: 'Error saving movie to the database' });
          }
          return;
        }
        resolve(true);
      });
    });
  }
}

export default MovieService;
