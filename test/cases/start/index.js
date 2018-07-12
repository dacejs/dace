// import request from 'supertest';
process.env.UNIT_TEST = true;
process.env.NODE_ENV = 'local';

const app = require('../../../src/server');

app.listen('1567', () => {
  console.log('http://localhost:1567');
});
// describe('start', async () => {
//   it('应该能正常访问首页', async () => {
//     const res = await request(app.listen()).get('/');
//     // res.status.should.eql(200);
//   });
// });
