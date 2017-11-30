import express from 'express';
import AdminContoller from '../controllers/admin';
import Helpers from '../middleware/helper';

const adminRouter = express.Router();


adminRouter.post('/api/v1/books', Helpers.adminUserExists, Helpers.isActivefalse, Helpers.authAdmin, AdminContoller.addBook);
adminRouter.put(
  '/api/v1/books/:bookId', Helpers.adminUserExists, Helpers.isActivefalse, Helpers.authAdmin, Helpers.bookExists,
  AdminContoller.modifyBook,
);
adminRouter.put('/api/v1/users/:userId/borrow/:bookId', Helpers.adminUserExists, Helpers.authAdmin, AdminContoller.acceptBorrowedBooks);
adminRouter.put('/api/v1/users/:userId/return/:bookId', Helpers.authAdmin, AdminContoller.acceptReturnedBooks);

export default adminRouter;
