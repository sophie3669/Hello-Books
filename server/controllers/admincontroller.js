import db from '../models/adminDb';
import books from '../models/booksDb';

/**
  * @class Admin
  */
   export default class Admin {
   /**
  *
  * @param {object} req 
  * @param {object} res
  * @return {object} json object
  */
  

  addBook(req, res) {
    const { id, bookName, description, author, quantity, publishYear } = req.body;
    if(db.adminDb.filter(item => item.id === parseInt(id, 10)).length === 1) {
     if (bookName && description && author && quantity && publishYear) { 
       if (typeof bookName === 'string' && typeof description === 'string' &&
         typeof author === 'string' && typeof quantity === 'string' &&
         typeof publishYear === 'string') {
            const newId = books.booksDb.length + 1;
            const newBook = books.booksDb.push({
              bookId: newId,
              bookName,
              description,
              author,
              quantity,
              publishYear
            });
              if (newBook) {
                res.status(201).send({
                message: 'book added by Admin user was successfully',
                
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
      
    };
  }
 

 modifyBook(req,res){
   let foundId = false;
  const { id, bookName, description, author, quantity, publishYear } = req.body;
  const bookId = req.params.bookId;
  if(db.adminDb.filter(item => item.id === parseInt(id, 10)).length === 1) {
    if(books.booksDb.filter(item => item.bookId === parseInt(bookId,10)).length === 1){
       if (typeof bookName === 'string' &&
            typeof description === 'string' &&
            typeof author === 'string' &&
            typeof quantity === 'string' &&
            typeof publishYear === 'string') {
        books.booksDb.bookName = bookName || books.booksDb.bookName;
        books.booksDb.description = description || books.booksdb.description;
        books.booksDb.author = author || books.booksDb.author;
        books.booksDb.quantity = quantity || books.booksDb.quantity;
        books.booksDb.publishYear = publishYear || books.booksDb.publishYear;
        foundId = true;
        res.status(201).send({
         message: 'book modified by Admin user was successfully',

         books: books.booksDb
          
         });
        } else {
          res.status(400).send({
                message: 'kindly ensure all inputs are strings'
          });
        }
         
       } else {
       res.status(400).send({
        message: ' No book of such exists!'
       });
     }
        } 
     else {
         res.status(403).send({
       message: 'you are not authorised to  a modify any book, kindly contact your system administrator!'
    });
    
  }
 }
}




 