// const db = require ('../models/admindb');
// const books = require('../models/booksdb');
import db from '../models/admindb';
import books from '../models/booksdb';
// const db = db.admindb;
/**
  * @class Book
  */
   export default class Book {
   /**
  *
  * @param {object} req 
  * @param {object} res
  * @return {object} json object
  */
  

  addbook(req, res) {
    const { id,bookname, description, author, quantity, publishYear } = req.body;
    if(db.admindb.filter(item => item.id === parseInt(id, 10)).length === 1) {
     if (bookname && description && author && quantity && publishYear) { 
       if (typeof bookname === 'string' &&
         typeof description === 'string' &&
         typeof author === 'string' &&
         typeof quantity === 'string' &&
         typeof publishYear === 'string') {
         const newId = books.booksdb.length + 1;
        const newBook = books.booksdb.push({
          id: newId,
          bookname,
          description,
          author,
          quantity,
          publishYear
        });
       if (newBook) {
          res.status(201).send({
           message: 'book added by Admin user was successfully',
            // details: db.booksdb
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
   } else {
           res.status(400).send({
         message: 'you are not authorised to add a book, kindly contact your system administrator!'
      });
      
    }
  }
 }


// export {Book};