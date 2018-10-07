import express from 'express';

import comments from './comments';
import movies from './movies';
import movie from './movie';
import MovieService from '../../services/MovieService';
import CommentsService from '../../services/CommentService';

const apiRouter = express.Router();

const movieService = new MovieService('http://www.omdbapi.com', 'dc4287c0');
const commentsService = new CommentsService();

apiRouter.use('/movie', movie(movieService));
apiRouter.use('/movies', movies(movieService));
apiRouter.use('/comments', comments(commentsService));

export default apiRouter;
