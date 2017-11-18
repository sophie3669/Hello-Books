import express from 'express';
import adminContoller from '../controllers/admin';

const adminRouter = express.Router();
const admin = new adminContoller();

adminRouter.post('/api/v1/books', admin.addBook);
adminRouter.put('/api/v1/books/:bookId', admin.modifyBook);
adminRouter.put('/api/v1/users/:userId/borrow/:bookId', admin.acceptBorrowedBooks);
adminRouter.put('/api/v1/users/:userId/return/:bookId', admin.acceptReturnedBooks);

export default adminRouter;