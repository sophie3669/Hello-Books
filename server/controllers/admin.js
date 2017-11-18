import { Books } from '../models';
import { Users } from '../models';
import  { BorrowedBooks} from '../models';

export default class adminController {
    
      /**
       * Create acocunt for a user
       * @method addBook
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */

        addBook(req, res) {
          
                Books
                .create({
                   
                 bookName : req.body.bookName,
                 description: req.body.description,
                 author: req.body.author,
                 quantity: req.body.quantity,
                 publishYear: req.body.publishYear
    
    
                })
                .then(Books => res.status(201).send(Books))
                .catch(error => res.status(400).send(error));

            }

        modifyBook(req, res){
           const bookId = parseInt(req.params.bookId, 10);

            return Books
            .findById(bookId)
             
              .then(Books => {
                if (!Books) {
                   return res.status(404).send({
                    message: 'Book Not Found',
                  });
                }
                 return Books
                  .update({
                    bookId: Books.bookId, 
                    bookName: req.body.bookName || Books.bookName,
                    description: req.body.description || Books.description,
                    author: req.body.author || Books.author,
                    quantity: req.body.quantity || Books.quantity,
                    publishYear: req.body.publishYear || Books.publishYear

                  })
                  .then(() => res.status(200).send(Books))  // Send back the updated book.
                  .catch((error) => res.status(400).send(error));
              })
              .catch((error) => res.status(400).send(error));
        
        }

       
        acceptBorrowedBooks(req,res){
          return BorrowedBooks
          .find({
              where: {
                userId: req.params.userId,
                bookId: req.params.bookId,
                borrowApproval: 0,
              },
            })
          .then(BorrowedBooks=> {
            if (!BorrowedBooks) {
              return res.status(404).send({
                message: 'Borrow record Not Found',
              });
            }
      
            return BorrowedBooks
            .update({
              borrowApproval: 1, 
              
            })
            .then(() => res.status(200).send(Books))  // Send back the updated borrowed book.
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
  

        }

        acceptReturnedBooks(req,res){
          return BorrowedBooks
          .find({
              where: {
                userId: req.params.userId,
                bookId: req.params.bookId,
                borrowApproval: 1,
                returnApproval: 0,
                returnStatus:0
              },
            })
          .then(BorrowedBooks=> {
            if (!BorrowedBooks) {
              return res.status(404).send({
                message: 'Pending Approval records Not Found',
              });
            }
      
            return BorrowedBooks
            .update({
              returnApproval: 1,
              returnStatus: 1,
              dateReturned : req.body.dateReturned 
              
            })
            .then(() => res.status(200).send(BorrowedBooks))  // Send back the updated borrowed book.
            .catch((error) => res.status(400).send(error));
        })
        .catch((error) => res.status(400).send(error));
  

        }

         
        }
      
