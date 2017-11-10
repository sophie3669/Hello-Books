/**
 * user routes
 */


import express from 'express';
import UserPriviledge from '../controllers/users';

const userRouter = express.Router();
const user = new UserPriviledge();

userRouter.post('/api/users/signup', user.createUser);
userRouter.post('/api/users/signin', user.loginUser);

export default userRouter;
