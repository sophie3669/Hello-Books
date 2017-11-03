/**
 *  Admin Routes
 */
const express = require("express");
import Admin from '../controllers/adminController';

const router = express.Router();
const sysAdmin = new Admin();


/**
 * @swagger
 * definition:
 *   addBooks:
 *     properties:
 *       bookName:
 *         type: string
 *       description:
 *         type: string
 *       author:
 *         type: string
 *       quantity:
 *         type: string
 *      publishYear:
 *         type: string
 */


/**
* @swagger
* /api/v1/books:
*   post:
*     tags:
*       - addBooks
*     description: Admins priviledge to add new books
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of added books
*         schema:
*           $ref: '#/definitions/addBooks'
*/
router.post('/api/v1/books', sysAdmin.addBook);
router.put('/api/v1/books/:bookId', sysAdmin.modifyBook);

router.put('/api/v1/users/:userId/borrow/:bookId',sysAdmin.acceptBorrowedBooks);
router.put('/api/v1/users/:userId/return/:bookId', sysAdmin.acceptRtndBook);


export default router;