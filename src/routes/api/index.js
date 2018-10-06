import express from 'express';

import comments from './comments';
import movies from './movies';
import MovieService from '../../services/MovieService';

const apiRouter = express.Router();

apiRouter.use('/movies', movies(new MovieService('http://www.omdbapi.com','dc4287c0')));
apiRouter.use('/comments', comments);

export default apiRouter;