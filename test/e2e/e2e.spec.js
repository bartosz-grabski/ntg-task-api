
import application from '../../src/app';
import debug from 'debug';
import request from "supertest";
import chai from "chai";
import Movie from '../../src/db/model/Movie';
import Comment from '../../src/db/model/Comment';

const log = debug('e2e');
const expect = chai.expect;

const app = application(
    {
        db: {
            host: 'localhost',
            port: process.env.TEST_DB_PORT,
            db: process.env.TEST_DB
        }
    }
);

describe("Application", () => {

    beforeEach((done) => {
        log('Cleaning up test database');
        Promise.all([
            Movie.collection.remove(),
            Comment.collection.remove()
        ]).then(() => {
            log('Database purge completed');
            done()
        }).catch((err) => {
            log(err);
            done()
        });
    });

    it("should successfully add a movie on a happy path", (done) => {

        const postData = {
            title: 'English' //should find 'The English Patient'
        };

        request(app)
            .post('/api/movies')
            .send(postData)
            .set('Content-Type', 'application/json')
            .expect(201)
            .end((err, res) => {
                console.log(err);
                expect(err).to.be.null;
                done();
            });

    });

    it("should fail adding the same movie twice", () => {
        return new Promise(async (resolve) => {
            const postData = {
                title: 'English'
            };

            await request(app)
                .post('/api/movies')
                .send(postData)
                .set('Content-Type', 'application/json');

            const result = await request(app)
                .post('/api/movies')
                .send(postData)
                .set('Content-Type', 'application/json');

            expect(result.error).not.to.be.null;
            expect(result.status).to.equal(400);
            resolve();
        });
    });

    it("should fail with a movie not existing in external db", () => {

        const postData = {
            title: 'Asddsa'
        };

        request(app)
            .post('/api/movies')
            .send(postData)
            .set('Content-Type', 'application/json')
            .expect(404)
            .end((err, res) => {
                console.log(err);
                expect(err).not.to.be.null;
                expect(res.status).to.equal(404);
                done();
            });

    });
});

