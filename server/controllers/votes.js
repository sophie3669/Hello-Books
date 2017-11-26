import { Users, Books, Votes} from '../models';

 
   export default class votesController{
      /**
       *  method to upVote/downVote a book
       * @method addVotes
       * @param {object} req 
       * @param {object} res
       * @return {json} 
       */
      addupVote(req, res){
     return Votes.create({
        userId: req.params.userId,
        bookId: req.params.bookId,
        upVotes: 1
    
      })
      
  }

    // updateUpvotes(req, res){
    // const bookId = parseInt(req.params.bookId, 10);
    // return Books
    // .findById(bookId)
        
    //     .then(Books => {
    //     if (!Books) {
    //         return res.status(404).send({
    //         message: 'Book Not Found',
    //         });
    //     }
    //         return Books
    //         const temp = Books.upVotes
    //         .update({
    //         bookId: Books.bookId, 
    //         bookName:  Books.bookName,
    //         description: Books.description,
    //         author: Books.author,
    //         quantity: Books.quantity,
    //         publishYear: Books.publishYear,
    //         //upVotes: Books.increment({upVotes:1})
            

    //         })
            
    //         .then(() => res.status(200).send({
    //             message: 'Book successfully upvoted',
    //         })  // Send back the updated book.
    //         .catch((error) => res.status(400).send(error)
    //         )
    //     .catch((error) => res.status(400).send(error))

    // )
    // })
    // }

    addDownVote(req, res){
        return Votes.create({
           userId: req.params.userId,
           bookId: req.params.bookId,
           downVotes: 1
       
         })
        
   }

//    updateDownVote(req, res){

//     return Books
//     .findById(bookId)
      
//       .then(Books => {
//         if (!Books) {
//             return res.status(404).send({
//             message: 'Book Not Found',
//           });
//         }
//           return Books
//           .update({
//             bookId: Books.bookId, 
//             bookName:  Books.bookName,
//             description: Books.description,
//             author: Books.author,
//             quantity: Books.quantity,
//             publishYear: Books.publishYear,
//             downVotes: Books.increment({'downVotes':1})
            

//           })
//           console.log(downVotes)
//           .then(() => res.status(200).send(Books))  // Send back the updated book.
//           .catch((error) => res.status(400).send(error));
//       })
//       .catch((error) => res.status(400).send(error));

 
//    }

}
    
           