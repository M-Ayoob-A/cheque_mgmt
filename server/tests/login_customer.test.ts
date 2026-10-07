import { test, describe, after, beforeEach } from "node:test";
import mongoose from "mongoose";
import supertest from 'supertest'
import app from "../app.ts";
import { UserModel } from "../models/user.ts";
import { CustomerModel } from "../models/customer.ts";
import bcrypt from 'bcrypt'
import assert from "assert";


const api = supertest(app)

const customerDataSingle = {
  "name": "Jennie Blake",
  "phone": "(95) 74 603 446",
  "email": "jennieblake@quantasis.com",
  "address": "Walker Court",
  "notes": "Consectetur aliquip officia ut magna nostrud in nulla duis fugiat et cillum sunt adipisicing aliquip."
}

const customerDataList = [
  {
    "name": "Jennie Blake",
    "phone": "(95) 74 603 446",
    "email": "jennieblake@quantasis.com",
    "address": "Walker Court",
    "notes": "Consectetur aliquip officia ut magna nostrud in nulla duis fugiat et cillum sunt adipisicing aliquip."
  },
  {
    "name": "Tate Melendez",
    "phone": "(88) 95 712 282",
    "email": "tatemelendez@quantasis.com",
    "address": "Seaview Avenue",
    "notes": "Sit dolore laborum aliqua ex nulla."
  },
  {
    "name": "Spencer Lamb",
    "phone": "(91) 94 772 414",
    "email": "spencerlamb@quantasis.com",
    "address": "Centre Street",
    "notes": "Eiusmod anim culpa labore in ipsum esse aute quis amet."
  }
]

const initUserDetails = {
  name: 'Vector P',
  username: 'vector_perkins',
  password: 'directionmagnitude'
}

const saltRounds = 10

let authString = ''

describe('login', () => {
  test('basic login functionality', async () => {
    await UserModel.deleteMany({})
    await UserModel.insertOne({
      ...initUserDetails,
      passwordHash: await bcrypt.hash(initUserDetails.password, saltRounds)
    })
    const response = await api
      .post('/api/login')
      .send({
        username: initUserDetails.username,
        password: initUserDetails.password
      })
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    assert(response.body.token)
    assert(Object.hasOwn(response.body, 'username'))
    assert.strictEqual(response.body.name, initUserDetails.name)
  })
})

describe('customer route tests', () => {
  beforeEach(async () => {
    await CustomerModel.deleteMany({})
    await UserModel.deleteMany({})

    await UserModel.insertOne({
      ...initUserDetails,
      passwordHash: await bcrypt.hash(initUserDetails.password, saltRounds)
    })

    const response = await api
      .post('/api/login')
      .send({
        username: initUserDetails.username,
        password: initUserDetails.password
      })
    
    authString = 'Bearer ' + response.body.token
  })

  test('GET: request fails with wrong token', async () => {
    const customerDeets = await CustomerModel.insertOne(customerDataSingle)
    await api.get(`/api/customers/${customerDeets.id}`)
              .set('Authorization', authString + 'h').expect(401)
  })
  
  test('GET: customers are returned in json format', async () => {
    await CustomerModel.insertMany(customerDataList)
    const returnedCustomers = await api.get('/api/customers').set('Authorization', authString)
                                  .expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(returnedCustomers.body.length, 3)
  })

  test('GET: single customer returned correctly', async () => {
    const customerDeets = await CustomerModel.insertOne(customerDataSingle)
    const returnedCustomer = await api.get(`/api/customers/${customerDeets.id}`)
                                  .set('Authorization', authString)
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/)
    assert.strictEqual(returnedCustomer.body.name, "Jennie Blake")
    assert.strictEqual(returnedCustomer.body.address, "Walker Court")
  })

  test('POST: adding single customer', async () => {
    const customerCreateResult = await api.post("/api/customers")
                                          .set('Authorization', authString)
                                          .send(customerDataSingle).expect(201)
                                          .expect('Content-Type', /application\/json/)
    const returnedCustomers = await api.get('/api/customers')
                                    .set('Authorization', authString)
                                    .expect(200)
                                    .expect('Content-Type', /application\/json/)
    assert.strictEqual(returnedCustomers.body.length, 1)
    assert.strictEqual(returnedCustomers.body[0].id, customerCreateResult.body.id)
  })

  test('PUT: update details', async () => {
    const customerCreateResult = await api.post("/api/customers").set('Authorization', authString)
                                          .send(customerDataSingle).expect(201)

    const customerAfterUpdate = await api.put(`/api/customers/${customerCreateResult.body.id}`)
                                        .set('Authorization', authString)
                                        .send({ ...customerDataSingle, address: "Centre Street" })
                                        .expect(200).expect('Content-Type', /application\/json/)
    assert.strictEqual(customerAfterUpdate.body.id, customerCreateResult.body.id)
    assert.strictEqual(customerAfterUpdate.body.address, "Centre Street")
  })

  test('DELETE: check for successful deletion', async () => {
    const customerCreateResult = await api.post("/api/customers")
                                          .set('Authorization', authString)
                                          .send(customerDataSingle)
                                          .expect(201)

    await api.delete(`/api/customers/${customerCreateResult.body.id}`)
              .set('Authorization', authString).expect(204)

    await api.get(`/api/customers/${customerCreateResult.body.id}`)
            .set('Authorization', authString).expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
