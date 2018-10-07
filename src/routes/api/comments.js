import { Router } from "express";
import debug from 'debug';

const log = debug('routes-comments');

export default (commentsService) => {

    const commentsRouter = Router();

    commentsRouter.get("/",async (req,res) => {
        const movieId = req.query.movieId;
        log(`GET comment received for ${movieId}`);
        let response = [];
        let status = 200;
        try {
            response = await commentsService.getAllCommentsForMovie(movieId);
        } catch (e) {
            log(e);
            status = 500;
        }

        res.status(status).send(response);

    });

    commentsRouter.post("/",async (req,res) => {

        const comment = req.body.comment;
        log(`POST comment received : ${comment}`);
        let status = 201;
        let response = 'Comment added';
        try {
            await commentsService.saveComment(comment);
        } catch (e) {
            log(e);
            status = 500;
            response = 'Error adding comment';
        }

        res.status(status).send(response);

    });

    return commentsRouter;

}

