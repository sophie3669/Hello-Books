import db from '../dummyModels/adminDb';
import books from '../dummyModels/booksDb';
import user from '../dummyModels/userDb';
import brwdBooks from '../dummyModels/brwdBooksDb';


/**
  * @class Admin
  */

 export default  class Admin {
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


 acceptBorrowedBooks(req,res){
  let foundBookId = false;
  let foundUserId = false;
  const {id} = req.body;
  const currentbook = brwdBooks.brwdBooksDb
  const bookId = parseInt(req.params.bookId, 10);
  const userId = parseInt(req.params.userId, 10);
  let bookQty = 0;
  let borrowerId;
  let borrowerShelf;
  let found = false;
  if(db.adminDb.filter(item => item.id === parseInt(id,10)).length === 1){
  if(user.userDb.filter(item => item.id === parseInt(userId,10)).length === 1){ 
    if(books.booksDb.filter(item => item.bookId === parseInt(bookId, 10)).length === 1) {
      // if(brwdBooks.brwdBooksDb.bookId === bookId && brwdBooks.brwdBooksDb.userId === userId)
      for (let i = 0; i < brwdBooks.brwdBooksDb.length; i+=1) {
        if ((brwdBooks.brwdBooksDb[i].bookId === bookId &&
          brwdBooks.brwdBooksDb[i].userId === userId) && (brwdBooks.brwdBooksDb[i].brwApproval !== 'Approved')) {
          borrowerId = brwdBooks.brwdBooksDb[i].brwId;
          borrowerShelf = i;
          found = true;
          break;
        }
      }
      if (found === true && borrowerId ) {
        brwdBooks.brwdBooksDb[borrowerShelf].brwApproval = "Approved";
        return res.status(200).send({
          approval: brwdBooks.brwdBooksDb[borrowerShelf],
          message: 'confirmation successful'
        })
      }
      res.status(404).send({
        message: ' No pending approval found for this request!'
     });
        
       
    } else {
        res.status(404).send({
           message: ' No book of such exists!'
        });
    }
  } else {
    res.status(403).send({
        message: 'you are not authorised to borrow a book, kindly register to gain priviledge!'
    }); 
  }

} else {
  res.status(403).send({
      message: 'you are not authorised to Approve'
  }); 
}
 }


 acceptRtndBook(req,res){
  let foundBookId = false;
  let foundUserId = false;
  const {adminId,dateReturned} = req.body;
  const bookId = req.params.bookId;
  const userId = req.params.userId;

  if(db.adminDb.filter(item => item.adminId === parseInt(adminId, 10)).length === 1) {
  if(brwdBooks.brwdBooksDb.filter(item => item.bookId === parseInt(bookId, 10)).length === 1) {
      if(brwdBooks.brwdBooksDb.filter(item => item.userId === parseInt(userId,10)).length === 1){
          if (typeof dateBorrowed === 'string'){
          brwdBooks.brwdBooksDb.dateReturned = dateReturned;
          brwdBooks.brwdBooksDb.rtnApproval = "Approved";
          brwdBooks.brwdBooksDb.returnStatus = "returned";
          
        
        foundBookId = true;
        foundUserId = true;
        res.status(201).send({
         message: 'book accepted to be borrowed',
         brwdBooks: brwdBooks.brwdBooksDb
          
         });
        } else {
          res.status(400).send({
                message: 'kindly ensure date has a string value'
          });
        }

      
      } else {
        res.status(401).send({
              message: 'Sorry you might have mada a mistake, this book does not belong here'
        });
      }
         
       } else {
       res.status(400).send({
        message: ' No book of such exists!'
       });
     }
        
     
    } else {
      res.status(400).send({
       message: ' You do not have the right to Approve, contact our system admin!'
      });
    }
  }
}
       
    





 