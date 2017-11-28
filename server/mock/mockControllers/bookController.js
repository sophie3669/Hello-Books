import books from '../mockModels/booksDb';
import user from '../mockModels/userDb';
import reviews from '../mockModels/reviewDb';
import favorites from '../mockModels/favoritesDb';
import votes from '../mockModels/votesDb';


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
    this.req = req;
    this.res = res;
    res.status(200).send(books.booksDb);
  }

  reviewBook(req, res) {
    this.req = req;
    this.res = res;

    const { review } = req.body;
    const { bookId } = req.params.bookId;
    const { userId } = req.params.userId;
    if (user.userDb.filter(item => item.id === parseInt(userId, 10)).length === 1) {
      if (books.booksDb.filter(item => item.bookId === parseInt(bookId, 10)).length === 1) {
        if (typeof review === 'string') {
          const newReviewId = reviews.reviewDb.length + 1;
          const newReview = reviews.reviewDb.push({
            reviewId: newReviewId,
            bookId,
            userId,
            review,
          });


          res.status(201).send({
            message: 'book review was successful',
            review: reviews.reviewDb,

          });
        } else {
          res.status(400).send({
            message: 'kindly ensure all inputs are strings',
          });
        }
      } else {
        res.status(400).send({
          message: ' No book of such exists!',
        });
      }
    } else {
      res.status(403).send({
        message: 'you are not authorised to review a book, kindly register to gain priviledge!',
      });
    }
  }

  makeFavorites(req, res) {
    this.req = req;
    this.res = res;
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);
   
    if (user.userDb.filter(item => item.id === parseInt(userId, 10)).length === 1) {
      if (books.booksDb.filter(item => item.bookId === parseInt(bookId, 10)).length === 1) {
        if ((favorites.favoritesDb.some(item => item.usersId === userId)) &&
           (favorites.favoritesDb.some(item => item.booksId === bookId))) {
          
          return res.status(409).send({
            message: 'Book already favorited by you',
          });
        }

        const newfavouriteId = favorites.favoritesDb.length + 1;
        const newfavorite = favorites.favoritesDb.push({

          id: newfavouriteId,
          bookId,
          userId,
        });

        if (newfavorite) {
          return res.status(200).send({
            favorites: newfavorite,
            message: 'Book successfully added to favorite',
            details: favorites.favoritesDb,
          });
        }


        return res.status(409).send({
          message: 'Internal Server Error',

        });
      }
      res.status(400).send({
        message: 'No such book exists!',
      });
    } else {
      res.status(400).send({
        message: 'you are not an authorised user!',
      });
    }
  }

  getUserFavourites(req, res) {
    const userId = parseInt(req.params.userId, 10);
    const count = 0;
    if (user.userDb.filter(item => item.id === parseInt(userId, 10)).length === 1) {
      for (let i = 0; i < favorites.favoritesDb.length; i++) {
        if (favorites.favoritesDb[i].usersId === userId) {
          return res.status(200).send({
            // favorites: newfavorite,
            message: 'record found',
            userdetails: favorites.favoritesDb[i],

          });
        }

        return res.status(400).send({
          message: 'You have no favorite record!',
        });
      }
    } else {
      return res.status(400).send({
        message: 'You are not an authorised user!',
      });
    }
  }

  getUpvotes(req, res) {
    res.status(200).send(votes.votesDb);
  }
}

