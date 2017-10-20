import express from 'express';
import Admin from '../controllers/adminController';

const router = express.Router();
const sysAdmin = new Admin();

router.post('/api/v1/books', sysAdmin.addBook);
router.put('/api/v1/books/:bookId', sysAdmin.modifyBook);

export default router;
