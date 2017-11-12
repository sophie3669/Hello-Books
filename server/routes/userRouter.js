/**
 * user routes
 */
import express from 'express';
import UserContoller from '../controllers/users';

const userRouter = express.Router();
const user = new UserContoller();

userRouter.post('/api/v1/users/signup', user.createUser);
userRouter.post('/api/v1/users/signin', user.login);

export default userRouter;
