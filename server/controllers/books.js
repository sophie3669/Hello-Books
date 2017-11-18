import { Books, Users,
  Reviews, Favourites, Votes } from '../models';

export default class bookController {

/**
 * Create methods for books
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

  makeFavorites(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10); 
    
    Favourites
    .findOne({ where: {bookId: bookId, userId: userId} })
    .then(result => {
      if (result) {
       return res.status(409).send({
          message: 'Book already favourited by you',
        });
      }
       return Favourites.create({
          bookId: bookId,
          userId: userId,
        })
        .then(() => res.status(201).send({
          message: 'Book added successfully'
        }))
        .catch(error => res.status(400).send(error));
    })
   }

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

  isBookAvailable(req,res){
    const bookId = parseInt(req.params.bookId, 10);
    
    return Books
     .findById(bookId)

    .then(Books => {
        if (!Books) {
         return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        return true;

    })
  }

    isVotesAvailable(req,res){
      const bookId = parseInt(req.params.bookId, 10);
      
      return Votes
      .findOne({ where: {bookId: bookId} })
  
      .then(votes => {
          if (!votes) {
             Votes
               .create({
                
                bookId : req.params.bookId,
                upVotes: req.body.upVotes,
                downVotes: req.body.downVotes
  
          })
          return Votes
             .update({
                bookId: Books.bookId, 
               upVotes: (Books.upVotes + req.body.upVotes) || Books.upVotes,
               downVotes: (Books.downVotes + req.body.downVotes) || Books.downVotes,
    
           })
             .then(() => res.status(200).send(Votes))  // Send back the updated book.
             .catch((error) => res.status(400).send(error));
         }
           })
      
        .catch((error) => res.status(400).send(error));
    
       }
      //  )}
    
  
    addVotes(req,res){
    
   if(bookController.isBookAvailable && bookController.isVotesAvailable){
    res.status(200).json({
      status: 'successful',
      message: 'Record updated successfully'
    });
   }

 }
  

    
    
}

  
   




 
