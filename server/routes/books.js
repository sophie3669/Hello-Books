import express from 'express';
import Books from '../controllers/bookController';

const bookRouter = express.Router();
const allBook = new Books();

bookRouter.get('/api/V1/books', allBook.getBooks);
bookRouter.post('/api/users/:userId/review/:bookId', allBook.reviewBook);



export default bookRouter;
