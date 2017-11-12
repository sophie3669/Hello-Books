import books from '../dummyModels/booksDb';
import user from '../dummyModels/userDb';
import reviews from '../dummyModels/reviewDb';
import favorites from '../dummyModels/favoritesDb';
import votes from '../dummyModels/votesDb';



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
        const bookId = parseInt(req.params.bookId, 10);
        const userId = parseInt(req.params.userId, 10);
        let found = false;
        
        if(user.userDb.filter(item => item.id === parseInt(userId,10)).length === 1){ 
          if(books.booksDb.filter(item => item.bookId === parseInt(bookId, 10)).length === 1) {
           if((favorites.favoritesDb.some(item => item.usersId === userId)) && 
           (favorites.favoritesDb.some(item => item.booksId === bookId))){
                 
              found = true;
                 return res.status(409).send({
                  message: 'Book already favorited by you'
                });
              }
              else{
                const newfavouriteId = favorites.favoritesDb.length + 1;
                const newfavorite = favorites.favoritesDb.push({

                  id : newfavouriteId,
                  bookId,
                  userId
                });

                   if(newfavorite){
                    return res.status(200).send({
                      favorites: newfavorite,
                      message: 'Book successfully added to favorite',
                      details: favorites.favoritesDb
                    });
                 
                  }
                  
                  else {
              
                  return res.status(409).send({
                    message: 'Internal Server Error'
                    
                  });
                }

              }
            } else {
              res.status(400).send({
            message: 'No such book exists!'
        });
        
      }


       } else {
               res.status(400).send({
             message: 'you are not an authorised user!'
          });
          
        };
      }

      getUserFavourites(req, res){
        
        const userId = parseInt(req.params.userId, 10);
        let count = 0;
        if(user.userDb.filter(item => item.id === parseInt(userId,10)).length === 1){
          for(let i = 0; i < favorites.favoritesDb.length; i++) {
          
            if(favorites.favoritesDb[i].usersId === userId){
              return res.status(200).send({
                //favorites: newfavorite,
                message: 'record found',
                userdetails: favorites.favoritesDb[i]
                
              });
              
           
            }
            else {
             return res.status(400).send({
            message: 'You have no favorite record!'
         });
       }
    }
 }
           else {
          return  res.status(400).send({
          message: 'You are not an authorised user!'
       });


      }
     
  }

   getUpvotes(req, res){
    
    res.status(200).send(votes.votesDb);
    
    }
  }

  
  

  
