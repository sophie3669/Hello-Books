import { Books, Users,
  Reviews, Favourites, Votes } from '../models';
  const Sequelize = require('sequelize');
  
   const instance = Sequelize.Instance;

export default class bookController {

/**
 *  methods to get all books
 * @method getBooks
 * @param {object} req 
 * @param {object} res
 * @return {json} 
*/
  getBooks(req,res){

    return Books
    .findAll()
    .then(Books => res.status(200).send(Books))
    .catch(error => res.status(400).send(error));
  }

   /**
       *  method to review a book
       * @method reviewBook
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
  reviewBook(req,res){
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);    

    Reviews
    .create({
       
     bookId : bookId,
     userId:  userId,
     review: req.body.review
     
    })
    .then(Reviews => res.status(201).send(Reviews))
    .catch(error => res.status(400).send(error));

  }

   /**
       *  method to favorite a book
       * @method makeFavorites
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */

  makeFavorites(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10); 
    
    Favourites
    
       return Favourites.create({
          bookId: bookId,
          userId: userId,
        })
        .then(() => res.status(201).send({
          message: 'Book added successfully'
        }))
        .catch(error => res.status(400).send(error));
    
   }

    /**
       *  method to get a users favorite
       * @method getUserFavorites
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
  getUserFavourites(req, res){
    const usersId = parseInt(req.params.userId, 10);
         
      
    return Favourites
    .findAll({ where: { userId: usersId } })
    .then(Favourites => {
      if (Favourites.length < 1) {
        res.status(404).json({
            status: 'Unsuccessful',
            message: 'Record Not Found'
          });
      }else{
        return res.status(200).send(Favourites);
      }
      
    })
    .catch(error => res.status(404).send({
        message: 'Record Not Found',
      })
    )
  }

   
      
   
  }




 
