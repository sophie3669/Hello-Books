import { Books, Reviews, Favourites } from '../models';


export default class bookController {
/**
 *  methods to get all books
 * @method getBooks
 * @param {object} req
 * @param {object} res
 * @return {json}
*/
  static getBooks(req, res) {
    return Books
      .findAll()
      .then(books => res.status(200).send(books))
      .catch(error => res.status(400).send(error));
  }

  /**
       *  method to review a book
       * @method reviewBook
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static reviewBook(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);

    Reviews
      .create({

        bookId,
        userId,
        review: req.body.review,

      })
      .then(reviews => res.status(201).send(reviews))
      .catch(error => res.status(400).send(error));
  }

  /**
       *  method to favorite a book
       * @method makeFavorites
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

  static makeFavorites(req, res) {
    const bookId = parseInt(req.params.bookId, 10);
    const userId = parseInt(req.params.userId, 10);


    return Favourites.create({
      bookId,
      userId,
    })
      .then(() => res.status(201).send({
        message: 'Book added successfully',
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
  static getUserFavourites(req, res) {
    const usersId = parseInt(req.params.userId, 10);


    return Favourites
      .findAll({ where: { userId: usersId } })
      .then((favourites) => {
        if (favourites.length < 1) {
          return res.status(404).json({
            status: 'Unsuccessful',
            message: 'Record Not Found',
          });
        }
        return res.status(200).send(Favourites);
      });
  }
}

