import request from 'supertest';
import app from '../app';
import server from '../server';
import { dropAllTables } from './databaseSetup';
import { repository } from '../../package.json';

/* eslint-disable consistent-return */

const serverTests = () => {
  beforeAll(() => {
    dropAllTables();
    server.close();
  });

  describe('GET /', () => {
    it('should send the correct message to check the documentation', done => {
      request(app)
        .get('/')
        .then(res => {
          const { status, text } = res;

          expect(status).toEqual(200);
          expect(text).toEqual(`Please go to ${repository} for API usage information.`);

          done();
        })
        .catch(error => {
          const { message } = error;

          done(message);
        });
    });
  });
};

export default serverTests;