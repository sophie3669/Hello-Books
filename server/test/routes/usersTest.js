//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
import bcrypt from 'bcryptjs';
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { Book} from '../../models';
import app from '../../app';

let should = chai.should();

// const server = supertest.agent(app);
chai.use(chaiHttp);

describe('POST: /api/v1/users/signup', () => {
    const salt = bcrypt.genSaltSync(10);
    let user = {
        userName: 'Sophie',
        password: bcrypt.hashSync("123456", salt),
        role: 1
    };
    it('should create a new user', (done) => {
        chai.request(app)
        .post('/api/v1/users/signup')
        .send({user})
        .end((err, res) => {
            // res.should.have.status(201);
            done();
        });
    });
});

