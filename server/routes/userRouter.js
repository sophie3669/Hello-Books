/**
 * user routes
 */
import express from 'express';
import UserController from '../controllers/users';
import Helpers from '../middleware/helper';
import VotesController from '../controllers/votes';


const userRouter = express.Router();


userRouter.post('/api/v1/users/signup', Helpers.isValidInputs, Helpers.UserAlreadyExists, UserController.createUser);
userRouter.post('/api/v1/users/signin', Helpers.isValidUserLogin, UserController.login);
userRouter.post('/api/v1/users/signout', Helpers.isValidUserLogin, UserController.signout);
userRouter.post(
  '/api/v1/users/:userId/borrow/:bookId', Helpers.userExists, Helpers.bookExists,
  Helpers.validBookQuantityExists, Helpers.PendingRecordExist, UserController.borrowBook,
);
userRouter.post('/api/v1/users/:userId/return/:bookId', Helpers.ReturnRequest, UserController.returnBook);
userRouter.post('/api/v1/users/:userId/upVotes/:bookId', Helpers.userExists, Helpers.bookExists, Helpers.userUpvoteExist, VotesController.addupVote);
userRouter.post('/api/v1/users/:userId/downVotes/:bookId', Helpers.userExists, Helpers.bookExists, Helpers.usersDownvoteExist, VotesController.addDownVote);
userRouter.get('/api/v1/books/sort/upvotes/desc', VotesController.sortUpVotes);


export default userRouter;
