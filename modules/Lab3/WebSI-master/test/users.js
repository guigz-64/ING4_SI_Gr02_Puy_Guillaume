
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('users', () => {

  beforeEach( async () => {
    await db.admin.clear()
  })

  it('list empty', async () => {
    // Return an empty user list by default
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([])
  })

  it('list one element', async () => {
    // Create a user
    await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    // Ensure we list the users correctly
    const {body: user} = await supertest(app)
    .get('/users')
    .expect(200)
    user.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      username: 'user_1'
    }])
  })

  it('add one element', async () => {
    // Create a user
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    .expect(201)
    // Check ists return value
    user.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      username: 'user_1'
    })
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get('/users')
    users.length.should.eql(1)
  })

})
