/**
 * user routes
 */
import express from 'express';
import UserContoller from '../controllers/users';
import Helpers from '../middleware/helper';


const userRouter = express.Router();
const user = new UserContoller();

userRouter.post('/api/v1/users/signup', user.createUser);
userRouter.post('/api/v1/users/signin', user.login);
userRouter.post('/api/v1/users/:userId/borrow/:bookId', Helpers.userExists,Helpers.bookExists,
         Helpers.validBookQuantityExists, Helpers.PendingRecordExist, user.borrowBook);
userRouter.post('/api/v1/users/:userId/return/:bookId', Helpers.ReturnRequest, user.returnBook);


export default userRouter;
