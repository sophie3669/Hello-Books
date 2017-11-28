import express from 'express';
import AdminContoller from '../controllers/admin';
import Helpers from '../middleware/helper';

const adminRouter = express.Router();


adminRouter.post(
  '/api/v1/books',
  Helpers.adminUserExists, AdminContoller.addBook,
);
adminRouter.put(
  '/api/v1/books/:bookId', Helpers.adminUserExists, Helpers.bookExists,
  AdminContoller.modifyBook,
);
adminRouter.put(
  '/api/v1/users/:userId/borrow/:bookId', Helpers.adminUserExists,
  Helpers.bookExists, Helpers.validBookQuantityExists, Helpers.PendingRecordExist,
  Helpers.PendingBorrowRequestExist, AdminContoller.acceptBorrowedBooks,
);
adminRouter.put('/api/v1/users/:userId/return/:bookId', Helpers.PendingReturnRequestExist, AdminContoller.acceptReturnedBooks);

export default adminRouter;
