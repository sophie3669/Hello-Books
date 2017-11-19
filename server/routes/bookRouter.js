import express from 'express';
import bookController from '../controllers/books';
import Helpers from '../middleware/helper';

const bookRouter = express.Router();
const books = new bookController();

bookRouter.get('/api/v1/books', books.getBooks);
bookRouter.post('/api/v1/users/:userId/review/:bookId', books.reviewBook);
bookRouter.post('/api/v1/users/:userId/fav/:bookId',
    Helpers.userExists, Helpers.bookExists, books.makeFavorites);
bookRouter.get('/api/v1/users/:userId/favbooks', books.getUserFavourites);
bookRouter.post('/api/books/:bookId/votes/:userId',Helpers.bookExists, 
    Helpers.userExists, books.addVotes);
//bookRouter.get('/api/books?:sort&:order', books.getUpvotes);



export default bookRouter;