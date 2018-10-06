import { Router } from "express";
import Comment from '../../db/model/Comment';


const commentsRouter = Router();

commentsRouter.get("/",(req,res) => {
    const movieId = req.query.movieId;
    Comment.find({
        movieId
    },(err,comments) => {
        if (err) {
            console.log('error')
        }
        res.status(200).send(comments);
    })

});

commentsRouter.post("/",(req,res) => {

});

export default commentsRouter;