import MoviesRouter from '../../../src/routes/api/movies';
import MoviesService from '../../../src/services/MovieService';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai from 'chai';
import request from 'supertest';
import express from 'express';

chai.use(sinonChai);

const expect = chai.expect;

describe("Movies router", () => {

    it("should delegate GET request to MoviesService on a happy path", (done) => {

        const movies = [ "movie1", "movie2"];
        const movieService = sinon.createStubInstance(MoviesService);
        movieService.getAllMovies.returns(movies);

        const moviesRouter = MoviesRouter(movieService);

        const app = express();
        app.use(express.json());
        app.use(moviesRouter);


        request(app)
            .get('/')
            .expect(200)
            .end(function(err, res) {
                expect(res.body).deep.equal(movies);
                done();
            });

    });

    it("should delegate POST call to MoviesService when movie details are successfully fetched from external db.", (done) => {

        const postData = {
            title: 'Title'
        };

        const { title } = postData;

        const movieDetails = {
            title,
            year: '2010'
        };

        const movieService = sinon.createStubInstance(MoviesService);
        movieService.lookupMovie.returns(movieDetails);
        movieService.saveMovie.returns(true);

        const moviesRouter = MoviesRouter(movieService);
        const app = express();
        app.use(express.json());
        app.use(moviesRouter);

        request(app)
            .post('/')
            .send(postData)
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                expect(movieService.lookupMovie).to.have.been.calledWith(postData.title);
                expect(movieService.saveMovie).to.have.been.calledWith(movieDetails);
                done();
            });

    });
});