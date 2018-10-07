import { Router } from "express";
import debug from "debug";

const log = debug('routes-movie');


export default (movieService) => {
    const movieRouter = Router();

    movieRouter.get("/:movieId/",async (req,res) => {
        log(`GET movie received : ${req.params}`);
        let response = [];
        let status = 200;
        try {
            response = await movieService.getMovieInfo(req.params.movieId);
        } catch (e) {
            log(e);
            response = e;
            status = 500;
        }
        res.status(status).send(response);
    });


    return movieRouter;
}
