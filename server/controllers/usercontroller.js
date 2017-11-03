import books from '../models/booksDb';
import user from '../models/userDb';
import brwdBooks from '../models/brwdBooksDb';

/**
  * @class UserPriviledge
  */
   export default class UserPriviledge {
   /**
  *
  * @param {object} req 
  * @param {object} res
  * @return {object} json object
  */
  

  borrowBook(req,res){
  let foundBookId = false;
  let foundUserId = false;
  const {dateBorrowed, dateToReturn } = req.body;
  const bookId = parseInt(req.params.bookId, 10);
  const userId = parseInt(req.params.userId, 10);
  let found = false;
  let bookQty = 0;
  let bookShelf = 0;
  if(user.userDb.filter(item => item.id === parseInt(userId,10)).length === 1){ 
    if(books.booksDb.filter(item => item.bookId === parseInt(bookId, 10)).length === 1) {
        for (let i = 0; i < brwdBooks.brwdBooksDb.length; i++) {
            if ((brwdBooks.brwdBooksDb[i].bookId === bookId) && (brwdBooks.brwdBooksDb[i].userId === userId) ) {
               if( !(brwdBooks.brwdBooksDb[i].returnStatus === 'Approved') ) {
                   found = true;
                   break;
                }
            }  
        }
        for (let i = 0; i < books.booksDb.length; i++) {
            if ((books.booksDb[i].bookId === bookId) ) {
                bookQty = books.booksDb[i].quantity;
                bookShelf = i;
                break;
            }  
        }
        if ((found === false) ) {
            if ((bookQty >= 1)) {

                const newbrwId = brwdBooks.brwdBooksDb.length + 1;
                const newBrwdBook = brwdBooks.brwdBooksDb.push({
                    brwId: newbrwId,
                    bookId,
                    userId,
                    dateBorrowed,
                    dateToReturn,
                    brwApproval: "ApprovaL Request made, waiting for Admin Approval",
                    rtnApproval: "yet to be returned",
                    returnStatus: "yet to be returned"
        
                });


                books.booksDb[bookShelf].quantity -= 1;
                res.status(200).send({
                    newBrwdBook: brwdBooks.brwdBooksDb,
                    message: 'Success',
                    remquantity: bookQty


                 });
            } else {
                res.status(401).send({
                    message: 'Sorry we ran out of stock for this book!'
                });
            }
             
        } else {
            res.status(401).send({
                message: 'Sorry you must first return borrowed book before making another request'
            });
        }
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

 }

 returnBook(req,res) {
    let found = false;
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);
    let borrowId = 0;
    let returnStatus = '';
    for (let i = 0; i < brwdBooks.brwdBooksDb.length; i++) {
        if ((brwdBooks.brwdBooksDb[i].bookId === bookId) && (brwdBooks.brwdBooksDb[i].userId === userId) ) {
            found = true;
            borrowId = i;
            returnStatus = brwdBooks.brwdBooksDb[i].returnStatus;
            break;
        }  
    }

    if (found === true) {
        if (returnStatus !== 'Approved') {
            console.log(returnStatus);
            brwdBooks.brwdBooksDb.rtnApproval = "Approval request made, waiting for administrator approval";
            brwdBooks.brwdBooksDb.returnStatus = "pending";
                res.status(201).send({
                    returnApproval: brwdBooks.brwdBooksDb.rtnApproval,
                    returnStatus:  brwdBooks.brwdBooksDb.returnStatus
                });
        } else {
            res.status(409).send({
                message: 'Sorry! this book seems to have been returned'
            });
        }  
    } else {
        res.status(404).send({
            message: 'Sorry We can\'t find your record'
        });
    }
 }
}