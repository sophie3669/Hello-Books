/**
 * book routes
 */
import express from 'express';
import Books from '../controllers/bookController';

const bookRouter = express.Router();
const allBook = new Books();

bookRouter.get('/api/V1/books', allBook.getBooks);

bookRouter.post('/api/v1/users/:userId/review/:bookId', allBook.reviewBook);
bookRouter.post('/api/v1/users/:userId/fav/:bookId', allBook.makeFavorites);
bookRouter.get('/api/v1/users/:userId/favbooks', allBook.getUserFavourites);
bookRouter.get('/api/v1/books/sort=upvote&order=desc', allBook.getUpvotes);




export default bookRouter;
