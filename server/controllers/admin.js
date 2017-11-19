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
            .update({
              bookId : req.params.bookId,
              userId: req.params.userId,
              borrowedDate: req.body.borrowedDate,
              returnDate: req.body.returnDate,
              borrowApproval: "Approved",
              returnApproval: "Pending",
              returnStatus: "Not Returned",
              dateReturned: req.body.returnDate
 
 
             })
            .then(() => res.status(200).send(Books))  // Send back the updated borrowed book.
            .catch((error) => res.status(400).send(error));
      

        }

        acceptReturnedBooks(req,res){
          
            return BorrowedBooks
            .update({
              bookId : req.params.bookId,
              userId: req.params.userId,
              borrowedDate: req.body.borrowedDate,
              returnDate: req.body.returnDate,
              borrowApproval: "Approved",
              returnApproval: "Approved",
              returnStatus:   "Returned",
              dateReturned: req.body.returnDate
 
 
            })
            .then(() => res.status(200).send(BorrowedBooks))  // Send back the updated borrowed book.
            .catch((error) => res.status(400).send(error));
       

        }

         
        }
      
