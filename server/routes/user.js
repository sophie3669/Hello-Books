/**
 * user routes
 */

import express from 'express';
import UserPriviledge from '../controllers/userController';

const userRouter = express.Router();
const user = new UserPriviledge();

userRouter.post('/api/v1/users/:userId/borrow/:bookId', user.borrowBook);
userRouter.post('/api/v1/users/:userId/return/:bookId', user.returnBook);

export default userRouter;
