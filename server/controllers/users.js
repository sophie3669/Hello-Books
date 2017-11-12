import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Users } from '../models';

require('dotenv').config();
/**
 * @class UserController
 */
export default class UserContoller {

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
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, salt),
      role: req.body.role
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));
  }

  login(req, res) {
    Users
    .findOne({ where: {
      username: req.body.username,
    } }).then((users) => {
      bcrypt.compare(req.body.password, users.password, (err, response) => {
        if (response) {
          const token = jwt.sign({
            id: users.id,
            username: users.username
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
}
