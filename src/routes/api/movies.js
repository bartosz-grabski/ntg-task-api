import { Router } from "express";
import { MovieServiceErrorCodes } from "../../services/MovieService";


export default (movieService) => {
    const moviesRouter = Router();

    moviesRouter.get("/",async (req,res) => {
        let response = [];
        let status = 200;
        try {
            const movies = await movieService.getAllMovies();
            response = movies;
        } catch (e) {
            response = e;
            status = 500;
        }
        res.status(status).send(response);
    });

    moviesRouter.post("/",async (req,res) => {
        let status = 201;
        let msg = "Movie added to database";
        let fetchedDetails = {};
        try {
            fetchedDetails = await movieService.lookupMovie(req.body.title);
            await movieService.saveMovie(fetchedDetails);
        } catch (err) {
            console.log(err);
            msg = err.msg;
            switch (err.code) {
                case MovieServiceErrorCodes.ERROR_ALREADY_EXIST:
                case MovieServiceErrorCodes.ERROR_NOT_FOUND:
                    status = 400;
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



