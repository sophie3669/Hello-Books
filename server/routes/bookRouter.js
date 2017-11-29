import express from 'express';
import BookController from '../controllers/books';
import Helpers from '../middleware/helper';

const bookRouter = express.Router();


bookRouter.get('/api/v1/books', BookController.getBooks);
bookRouter.post('/api/v1/users/:userId/review/:bookId', BookController.reviewBook);
bookRouter.post(
  '/api/v1/users/:userId/fav/:bookId',
  Helpers.userExists, Helpers.bookExists, BookController.makeFavorites,
);
bookRouter.get('/api/v1/users/:userId/favbooks', BookController.getUserFavourites);
export default bookRouter;
