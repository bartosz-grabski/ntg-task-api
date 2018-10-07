import debug from 'debug';
import Comment from '../db/model/Comment';

const log = debug('services-comments');


class CommentService {
  async getAllCommentsForMovie(movieId) {
    log(movieId);
    return new Promise((resolve, reject) => {
      Comment.find({ movieId }, (err, comments) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(comments);
      });
    });
  }

  async saveComment(comment) {
    log(comment);
    return new Promise((resolve, reject) => {
      new Comment(comment).save((error) => {
        if (error) {
          console.error(error);
          reject(error);
          return;
        }
        resolve(true);
      });
    });
  }
}

export default CommentService;
