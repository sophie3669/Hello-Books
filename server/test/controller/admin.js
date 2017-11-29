import chai from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../../app';
import fakeData from '../fake/fake';

const { assert } = require('chai').assert;


chai.should();
chai.use(chaiHttp);

describe('Users Controller', () => {
  describe('handleInvalidInput', () => {
    it('should return 0 as result for {}', () => {
      assert.equal(myapp.aritgeo([]), '0');
    });
  });
});
