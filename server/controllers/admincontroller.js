// const db = require ('../models/admindb');
// const books = require('../models/booksdb');
import db from '../models/admindb';
import books from '../models/booksdb';
/**
  * @class Book
  */
   class Book {
   /**
  *
  * @param {object} req 
  * @param {object} res
  * @return {object} json object
  */

  addbook(req, res) {
    const { bookname, description, author, quantity, publishyear } = req.body;

    if (bookname && description && author && quantity && publishyear) {
       if (typeof bookname === 'string' &&
         typeof description === 'string' &&
         typeof author === 'string' &&
         typeof quantity === 'string' &&
         typeof publishyear === 'string') {
         const newId = db.booksdb.length + 1;
        const appendadmindata = db.booksdb.push({
          id: newId,
          bookname,
          description,
          author,
          quantity,
          publishyear
        });
       if (appendadmindata) {
          res.status(200).send({
           message: 'book added by Admin user was successfully',
            details: db.recipesdb
           });
         } else {
         res.status(500).send({
               message: 'failed to create new, try again'
         });
       }
          } else {
        res.status(400).send({
          message: ' data must be in strings!'
        });
      }
   } else {
           res.status(400).send({
         message: 'Incomplete book data!'
      });
    }
 }
}
export {Book};