/**
 *  Admin Routes
 */
const express = require("express");
import Admin from '../dummyControllers/adminController';

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

/**
 * @swagger
 * /api/v1/books/:bookId
 *   put:
 *     tags: books
 *     description: Updates an existing book
 *     produces: application/json
 *     parameters:
 *       name: book
 *       in: body
 *       description: Fields for the books resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/books'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/api/v1/books/:bookId', sysAdmin.modifyBook);


/**
 * @swagger
 * /api/v1/users/:userId/borrow/:bookId
 *   put:
 *     tags: books
 *     description: Updates the status of a borrowed book
 *     produces: application/json
 *     parameters:
 *       name: books
 *       in: body
 *       description: Fields for the borrowed book resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/books'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/api/v1/users/:userId/borrow/:bookId',sysAdmin.acceptBorrowedBooks);

/**
 * @swagger
 * /api/v1/users/:userId/return/:bookId
 *   put:
 *     tags: books
 *     description: Updates the status of a returned book
 *     produces: application/json
 *     parameters:
 *       name: books
 *       in: body
 *       description: Fields for the borrowed book resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/books'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/api/v1/users/:userId/return/:bookId', sysAdmin.acceptRtndBook);


export default router;