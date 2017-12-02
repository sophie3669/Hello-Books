/**
 * book routes
 */
import express from 'express';
import Books from '../mockControllers/bookController';

const bookRouter = express.Router();
const allBook = new Books();

bookRouter.get('/api/V1/books', allBook.getBooks);

bookRouter.post('/api/v1/users/:userId/review/:bookId', allBook.reviewBook);
bookRouter.post('/api/v1/users/:userId/fav/:bookId', allBook.makeFavorites);
bookRouter.get('/api/v1/users/:userId/favbooks', allBook.getUserFavourites);
bookRouter.get('/api/books?:sort&:order', allBook.getUpvotes);



export default bookRouter;