import { Router } from "express";
import { MovieServiceErrorCodes } from "../../services/MovieService";
import debug from "debug";

const log = debug('routes-movies');

export default (movieService) => {
    const moviesRouter = Router();

    moviesRouter.get("/",async (req,res) => {
        log(`GET movies received`);
        let response = [];
        let status = 200;
        try {
            response = await movieService.getAllMovies();
        } catch (e) {
            log(e);
            response = e;
            status = 500;
        }
        res.status(status).send(response);
    });

    moviesRouter.post("/",async (req,res) => {
        log(`POST movies received for ${req.body.title}`);
        let status = 201;
        let msg = "";
        let fetchedDetails = {};
        try {
            fetchedDetails = await movieService.lookupMovie(req.body.title);
            await movieService.saveMovie(fetchedDetails);
            msg = `Movie "${fetchedDetails.title}" added to database`;
        } catch (err) {
            log(err);
            msg = err.msg;
            switch (err.code) {
                case MovieServiceErrorCodes.ERROR_ALREADY_EXIST:
                    status = 400;
                    break;
                case MovieServiceErrorCodes.ERROR_NOT_FOUND:
                    status = 404;
                    break;
                case MovieServiceErrorCodes.ERROR_FETCHING:
                case MovieServiceErrorCodes.ERROR_SAVING:
                    status = 500;
                    break;
            }
        }

        res.status(status).send(msg);
    });

    return moviesRouter;
}



