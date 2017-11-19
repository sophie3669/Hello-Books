import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users, BorrowedBooks } from '../models';

require('dotenv').config();
/**
 * @class UserController
 */
export default class UserController {

  /**
   * Create acocunt for a user
   * @method createUser
   * @param {object} req 
   * @param {object} res
   * @return {json} 
   */
  createUser(req, res) {
    const salt = bcrypt.genSaltSync(10);
    Users
    .create({
      userName: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
      role: req.body.role
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  }

  login(req, res) {
    Users
    .findOne({ where: {
      userName: req.body.username,
    } }).then((users) => {
      console.log(users)
      bcrypt.compare(req.body.password, users.password, (err, response) => {
        if (response) {
          const token = jwt.sign({
            id: users.id,
            username: users.userName
          }, process.env.JWT_SECRET, { expiresIn: 86400 });
          return res.status(200).send({
            message: 'success',
            token
          });
        }
        return res.status(400).send({ message: 'incorrect login details' });
      });
    })
    .catch(error => res.status(400).send(error));
  }

    borrowBook(req, res){

      const bookId = parseInt(req.params.bookId, 10);
  
                   return BorrowedBooks
                   .create({
                      
                    bookId : req.params.bookId,
                    userId: req.params.userId,
                    borrowedDate: req.body.borrowedDate,
                    returnDate: req.body.returnDate,
                    borrowApproval: "Pending",
                    returnApproval: "Pending",
                    returnStatus: "Not Returned",
                    dateReturned: req.body.returnDate
       
       
                   })
                   .then(status => res.status(201).send(status))
                   .catch(error => res.status(400).send(error));
   
              }


              returnBook(req, res){
                
                      const bookId = parseInt(req.params.bookId, 10);
                  
                                   return BorrowedBooks
                                   .update({
                                    bookId : req.params.bookId,
                                    userId: req.params.userId,
                                    borrowedDate: req.body.borrowedDate,
                                    returnDate: req.body.returnDate,
                                    borrowApproval: "Approved",
                                    returnApproval: "Pending",
                                    returnStatus: "returned but not approved",
                                    dateReturned: req.body.returnDate
                       
                       
                                   })
                                   .then(status => res.status(201).send(status))
                                   .catch(error => res.status(400).send(error));
                   
                              }  
            
}
