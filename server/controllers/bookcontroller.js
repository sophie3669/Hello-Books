import books from '../models/booksDb';
import user from '../models/userDb';
import reviews from '../models/reviewDb';

/**
  * @class Books
  */
  export default class Books {
    /**
   *
   * @param {object} req 
   * @param {object} res
   * @return {object} json object
   */
   

   getBooks(req, res) {
       res.status(200).send(books.booksDb);
      }

      reviewBook(req,res){
        let foundBookId = false;
        let foundUserId = false;
        const {review } = req.body;
        const bookId = req.params.bookId;
        const userId = req.params.userId;
      if(user.userDb.filter(item => item.id === parseInt(userId,10)).length === 1){
        if(books.booksDb.filter(item => item.bookId === parseInt(bookId, 10)).length === 1) {
            
                   if (typeof review=== 'string' ) {
                      const newReviewId = reviews.reviewDb.length + 1;
                      const newReview = reviews.reviewDb.push({
                          reviewId: newReviewId,
                          bookId,
                          userId,
                          review
                      });
              foundBookId = true;
              foundUserId = true;
          
              res.status(201).send({
               message: 'book review was successful',
               review: reviews.reviewDb
                
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
             message: 'you are not authorised to review a book, kindly register to gain priviledge!'
          });
          
        }
       }

       makeFavorites(req, res){
        const bookId = req.params.bookId;
        const userId = req.params.userId;
        
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
     
  }