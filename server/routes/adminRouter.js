import express from 'express';
import adminContoller from '../controllers/admin';
import Helpers from '../middleware/helper';

const adminRouter = express.Router();
const admin = new adminContoller();

adminRouter.post('/api/v1/books',
Helpers.adminUserExists, admin.addBook );
adminRouter.put('/api/v1/books/:bookId', Helpers.adminUserExists, Helpers.bookExists,
        admin.modifyBook);
adminRouter.put('/api/v1/users/:userId/borrow/:bookId', Helpers.adminUserExists,
        Helpers.bookExists, Helpers.validBookQuantityExists,Helpers.PendingRecordExist, 
        Helpers.PendingBorrowRequestExist, admin.acceptBorrowedBooks);
adminRouter.put('/api/v1/users/:userId/return/:bookId', Helpers.PendingReturnRequestExist,admin.acceptReturnedBooks);

export default adminRouter;