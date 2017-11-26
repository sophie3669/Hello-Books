/**
 * user routes
 */
import express from 'express';
import UserContoller from '../controllers/users';
import Helpers from '../middleware/helper';
import votesController from '../controllers/votes'
 


const userRouter = express.Router();
const user = new UserContoller();
const votes = new votesController();


userRouter.post('/api/v1/users/signup', Helpers.isValidInputs,user.createUser);
userRouter.post('/api/v1/users/signin', Helpers.isValidUserLogin, user.login);
userRouter.post('/api/v1/users/signout', Helpers.isValidUserLogin, user.signout);
userRouter.post('/api/v1/users/:userId/borrow/:bookId', Helpers.userExists,Helpers.bookExists,
         Helpers.validBookQuantityExists, Helpers.PendingRecordExist, user.borrowBook);
userRouter.post('/api/v1/users/:userId/return/:bookId', Helpers.ReturnRequest, user.returnBook);
userRouter.post('/api/v1/users/:userId/upVotes/:bookId',Helpers.userExists,Helpers.bookExists, Helpers.userUpvoteExist, votes.addupVote);
userRouter.post('/api/v1/users/:userId/downVotes/:bookId',Helpers.userExists,Helpers.bookExists, Helpers.usersDownvoteExist, votes.addDownVote);
//userRouter.post('/api/v1/users/:userId/updateupVotes/:bookId', votes.updateUpvotes);



export default userRouter;
