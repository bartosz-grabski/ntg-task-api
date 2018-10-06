import express from 'express';


import comments from 'src/routes/api/comments';
import movies from 'src/routes/api/movies';


const apiRouter = express.Router();

apiRouter.route('movies', movies);
apiRouter.route('comments', comments);

export default apiRouter;