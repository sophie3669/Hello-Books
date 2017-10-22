import express from 'express';
import Admin from '../controllers/adminController';

const router = express.Router();
const sysAdmin = new Admin();

router.post('/api/v1/books', sysAdmin.addBook);
router.put('/api/v1/books/:bookId', sysAdmin.modifyBook);
router.put('/api/v1/users/:userId/borrow/:bookId',sysAdmin.acceptBrwdBooks);
router.put('/api/v1/users/:userId/return/bookId', sysAdmin.acceptRtndBook);

export default router;
