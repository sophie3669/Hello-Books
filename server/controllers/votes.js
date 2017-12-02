import sequelize from 'sequelize';
import { Books, Votes } from '../models';

export default class votesController {
  /**
       *  method to upVote a book
       * @method addVotes
       * @param {object} req
       * @param {object} res
       * @return {json}
       */
  static addupVote(req, res) {
    Votes.create({
      userId: req.params.userId,
      bookId: req.params.bookId,
      upVotes: 1,
      downVotes: 0,
    })
      .then(() => {
        Books.findById(req.params.bookId)
          .then(book => book.increment('upVotes', { by: 1 })
            .then(returnedbook =>
              res.status(200).send({
                message: 'updated successfully',
                returnedbook,
              }))
            .catch(err => res.send(err.toString())));
      });
  }


  static addDownVote(req, res) {
    /**
       *  method to downVote a book
       * @method addVotes
       * @param {object} req
       * @param {object} res
       * @return {json}
       */

    Votes.create({
      userId: req.params.userId,
      bookId: req.params.bookId,
      upVotes: 0,
      downVotes: 1,
    })
      .then(() => {
        Books.findById(req.params.bookId)
          .then(book => book.increment('downVotes', { by: 1 })
            .then(votes =>
              res.status(200).send({
                message: 'downvoted successfully',
                votes,
              }))
            .catch(err => res.send(err.toString())));
      });
  }

  static sortUpVotes(req, res) {
    const options = {};
    options.order = [['upVotes', 'DESC']];
    options.include = [{ all: true }];
    Books.findAll(options)
      .then(Book => res.json(Book));
  }
}

