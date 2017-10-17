import express from 'express';
import Book from '../controllers/admincontroller';

const router = express.Router();
const myBook = new Book();

router.post('/api/v1/books', myBook.addbook);

export default router;
