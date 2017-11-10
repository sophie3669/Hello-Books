import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models';

const User = db.users;
const secret = 'iamsophie';

// console.log(`user: ${db.user}`);

const createUser = (req, res) =>
  User
    .create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error));

const loginUser = (req, res) =>
  User
    .findOne({ where: {
      email: req.body.email
    } }).then((users) => {
      bcrypt.compare(req.body.password, users.password, (err, response) => {
        if (response) {
          const token = jwt.sign({
            username: user.username
          }, secret, { expiresIn: 86400 });
          return res.status(200).send({
            message: 'success',
            token
          });
        }
        return res.status(400).send({ message: 'incorrect login details' });
      });
    })
    .catch(error => res.status(400).send(error));
