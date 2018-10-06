import { Router } from "express";
import Movie from '../../db/model/Movie';


export default (MovieService) => {
    const moviesRouter = Router();

    moviesRouter.get("/",(req,res) => {
        Movie.find({}, (err,movies) => {
            if (err) {
                res.sendStatus(500);
            }
            res.status(200).send(movies);

        })
    });

    moviesRouter.post("/",(req,res) => {
        MovieService
            .lookupMovie(req.body.title)
            .then(movieDetails => {
                const movie = new Movie(movieDetails);
                movie.save((err) => {
                    let status = 201;
                    let msg = "Movie added to database";
                    if (err) {
                        if (err.code === 11000) { //movie exists
                            msg = `Found "${movieDetails.title}", which already exists in the database!`;
                            status = 400;
                        } else {
                            msg = 'Error adding movie to the database';
                            status = 500;
                        }
                    }

                    res.status(status).send(msg);
                })
            })
            .catch((msg) => {
                res.status(400).send(msg);
            });
    });

    return moviesRouter;
}



