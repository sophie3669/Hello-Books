import { Books, Users,
    Reviews, Favourites, Votes } from '../models';

export default class Helpers {
    static userExists (req, res, next) {;
        const id = parseInt(req.params.userId, 10); 
        Users.findOne({ where: { id } })
        .then((user) => {
            if(!user) {
              return res.status(401).send({
                message: "Sorry you're not authorized to favourite a book"
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
}
