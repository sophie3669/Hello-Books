import { Books, Users,
    Reviews, Favourites, Votes, BorrowedBooks} from '../models';

    const Sequelize = require('sequelize')
   
    const Op = Sequelize.Op;

    

export default class Helpers {

     /**
       *  Helper class to authenticate Users
       * @method userExists
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
    static userExists (req, res, next) {
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

     /**
       *  method to validate users input
       * @method isValidInputs
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
    static isValidInputs(req, res, next){
    const { firstName,lastName, email,username, password,confirmPassword, role } = req.body;
    if (username === '' || typeof username !== 'string') {
        return res.status(400).send({
          message: 'Please enter your username.'
        })
      } 
      if (password === ' '){
        return res.status(400).send({
          message: 'please enter a password.'
        })
      }
      if (password.length < 5){
  
        return res.status(400).send({
          message: 'length must be at least 5 characters for security '
        })
      }
      if (confirmPassword === " "){
        return res.status(400).send({
            message: 'please re-confirm your password '
        })

      }

      if(password !== confirmPassword){

        return res.status(400).send({
            message: 'password does not match, please check again'
        })
      }
      if(role === ' '){
  
        return res.status(400).send({
          message: 'please input a role'
        })
      }
      next();
    }

     /**
       *  method to validate Login details
       * @method isValidUserLogin
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
    static isValidUserLogin(req, res, next){
     const { username } = req.body;
     Users.findOne({ where: { username } })
    .then((user) => {
       if(!user) {
         return res.status(401).send({
           message: "Sorry wrong username"
         })
       }
       next();
   })
   .catch((error) => {
       res.status(500).send(error)
    })
}


    /**
       *  method to check the existence of  a book
       * @method bookExists
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
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

     /**
       *  method to check if Admin Exists
       * @method adminUserExists
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */

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

    /**
       *  method to check for book quantiy 
       * @method validBookQuantityExists
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
    
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


    /**
       *  method to check if pending record Exists
       * @method pendingRecordExists
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
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
    
    /**
       *  method to authenticate a return request
       * @method returnRequest
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */

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

    /**
       *  method to check the existence of a pending borrow request
       * @method PendingBorrowRequestExist
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */

    
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

    /**
       *  method to check the existence of a pending return request
       * @method PendingReturnRequestExist
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
    
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
        
    static votenotExist(){

        const bookId = parseInt(req.params.bookId, 10);
        //const upVotes = parseInt(req.body.upVotes);
        //const downVotes = parseInt(req.body.downVotes);

        return Votes
        .findOne({ where: { bookId } })
        .then((report) => {
            if(!report) {
    }
    next();
  })

 }
}