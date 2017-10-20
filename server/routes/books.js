import express from 'express';
import Book from '../controllers/bookController';

const bookRouter = express.Router();
const allBook = new Book();

bookRouter.get('/api/V1/books', allBook.getBooks);


export default bookRouter;
