import { Books, Users,
    Reviews, Favourites, Votes, BorrowedBooks} from '../models';

    const Sequelize = require('sequelize')
   
    const Op = Sequelize.Op;

export default class Helpers {
    static userExists (req, res, next) {;
        const id = parseInt(req.params.userId, 10); 
        Users.findOne({ where: { id } })
        .then((user) => {
            if(!user) {
              return res.status(401).send({
                message: "Sorry you're not an authorized user"
              })
            }
            next();
        })
        .catch((error) => {
            res.status(500).send(error)
         })
    }

    static bookExists (req, res, next) {
        const id = parseInt(req.params.bookId, 10)
        Books.findOne({ where: { id }})
        .then((result) => {
          if(!result) {
            return res.status(404).send({
              message: 'Sorry! Book not found'
            })
          }
          next();
        })
        .catch((error) => {
            res.status(500).send(error)
        }) 
    }

         static adminUserExists (req, res, next) {
        
            const id = parseInt(req.body.id, 10); 
            Users.findOne({ where: { id , role: 1 } })
            .then((admin) => {
                if(!admin) {
                  return res.status(401).send({
                    message: "Sorry you're not an authorized Amin, contact your DBMA"
                  })
                }
                next();
            })
            .catch((error) => {
                res.status(500).send(error)
             })
        }

        static validBookQuantityExists (req, res, next) {
            
                const bookId = parseInt(req.params.bookId, 10); 
                Books.findOne({ where: { id: bookId ,  quantity: {[Op.gt]: 1 } } })
                .then((book) => {
                    if(!book) {
                      return res.status(401).send({
                        message: "Sorry, we are out of stock for this book"
                      })
                    }
                    next();
                })
                .catch((error) => {
                    res.status(500).send(error)
                 })
            }

        static PendingRecordExist (req, res, next){

            const bookId = parseInt(req.params.bookId, 10);
            const userId = parseInt(req.params.userId , 10);

            BorrowedBooks.findOne({ where: { bookId ,  userId, returnStatus : "Not Returned" } })
            .then((report) => {
                if(report) {
                  return res.status(401).send({
                    message: "Sorry, you must first return borrowed books before making another request"
                  })
                }
                next();
            })
            .catch((error) => {
                res.status(500).send(error)
             })
        


        }   

         static ReturnRequest (req, res, next){

            const bookId = parseInt(req.params.bookId, 10);
            const userId = parseInt(req.params.userId , 10);

            BorrowedBooks.findOne({ where: { bookId ,  userId, returnStatus : "Not Returned" } })
            .then((report) => {
                if(!report) {
                    return res.status(401).send({
                    message: "Sorry, you have no pending book to return"
                    })
                }
                next();
            })
            .catch((error) => {
                res.status(500).send(error)
                })
        


        }   

        
        static  PendingBorrowRequestExist (req, res, next){
            
            const bookId = parseInt(req.params.bookId, 10);
            const userId = parseInt(req.params.userId , 10);

            BorrowedBooks.findOne({ where: { bookId ,  userId, borrowApproval : "Pending" } })
            .then((report) => {
                if(!report) {
                    return res.status(401).send({
                    message: "No pending request recorded"
                    })
                }
                next();
            })
            .catch((error) => {
                res.status(500).send(error)
                })
        


        } 
        
        static  PendingReturnRequestExist (req, res, next){
            
            const bookId = parseInt(req.params.bookId, 10);
            const userId = parseInt(req.params.userId , 10);

            BorrowedBooks.findOne({ where: { bookId ,  userId, borrowApproval : "Approved" ,
                                             returnStatus: "returned but not approved"} })
            .then((report) => {
                if(!report) {
                    return res.status(401).send({
                    message: "No pending request recorded"
                    })
                }
                next();
            })
            .catch((error) => {
                res.status(500).send(error)
                })
        


        }
        
    
   

}