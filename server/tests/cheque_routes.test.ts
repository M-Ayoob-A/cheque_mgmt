//import assert from "node:assert";
import { test, describe, after, beforeEach } from "node:test";
import mongoose from "mongoose";
import supertest from 'supertest'
import app from "../app.ts";
import { UserModel } from "../models/user.ts";
import { ChequeModel } from "../models/cheque.ts";
import { CustomerModel } from "../models/customer.ts";
import bcrypt from 'bcrypt'
import assert from "assert";


const api = supertest(app)

const custData = {
  "name": "Jennie Blake",
  "phone": "(95) 74 603 446",
  "email": "jennieblake@quantasis.com",
  "address": "Walker Court",
  "notes": "Consectetur aliquip officia ut magna nostrud in nulla duis fugiat et cillum sunt adipisicing aliquip."
}

const chequeDataSingle = {
  "submitted": false,
  "amount": 1271,
  "agent": "Rosetta Daugherty",
  "bank": "MEDALERT",
  "issue_date": "2026-03-19",
  "realisation_date": "2027-02-03"
}

const chequeDataList = [
  {
    "submitted": false,
    "amount": 1271,
    "agent": "Rosetta Daugherty",
    "bank": "MEDALERT",
    "issue_date": "2026-03-19",
    "realisation_date": "2027-02-03"
  },
  {
    "submitted": false,
    "amount": 3843,
    "agent": "Louisa Nieves",
    "bank": "SLOFAST",
    "issue_date": "2026-03-17",
    "realisation_date": "2026-10-25"
  },
  {
    "submitted": true,
    "amount": 3033,
    "agent": "Lauri Anderson",
    "bank": "LIMAGE",
    "issue_date": "2026-01-30",
    "realisation_date": "2026-06-13"
  }
]

const initUserDetails = {
  name: 'Vector P',
  username: 'vector_perkins',
  password: 'directionmagnitude'
}

const saltRounds = 10

let authString = ''

describe('cheque route tests', () => {
  beforeEach(async () => {
    await ChequeModel.deleteMany({})
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
    const customerDeets = await CustomerModel.insertOne(custData)
    const chequeDeets = await ChequeModel.insertOne({ ...chequeDataSingle, customer: customerDeets.id })
    await api.get(`/api/cheques/${chequeDeets.id}`)
              .set('Authorization', authString + 'h').expect(401)
  })
  
  test('GET: cheques are returned in json format', async () => {
    const customerDeets = await CustomerModel.insertOne(custData)
    await ChequeModel.insertMany(chequeDataList.map(c => ({ ...c, customer: customerDeets.id })))
    const returnedCheques = await api.get('/api/cheques')
                                  .set('Authorization', authString)
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/)
    assert.strictEqual(returnedCheques.body.length, 3)
  })

  test('GET: single cheque returned correctly', async () => {
    const customerDeets = await CustomerModel.insertOne(custData)
    const chequeDeets = await ChequeModel.insertOne({ ...chequeDataSingle, customer: customerDeets.id })
    const returnedCheque = await api.get(`/api/cheques/${chequeDeets.id}`)
                                  .set('Authorization', authString)
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/)
    assert.strictEqual(returnedCheque.body.agent, "Rosetta Daugherty")
    assert.strictEqual(returnedCheque.body.amount, 1271)
  })

  test('POST: adding single cheque', async () => {
    const customerDeets = await CustomerModel.insertOne(custData)
    const chequeCreateResult = await api.post("/api/cheques")
                                  .set('Authorization', authString)
                                  .send({ ...chequeDataSingle, customer: customerDeets.id })
                                  .expect(201)
                                  .expect('Content-Type', /application\/json/)
    const returnedCheques = await api.get('/api/cheques')
                                  .set('Authorization', authString)
                                  .expect(200)
                                  .expect('Content-Type', /application\/json/)
    assert.strictEqual(returnedCheques.body.length, 1)
    assert.strictEqual(returnedCheques.body[0].id, chequeCreateResult.body.id)
  })

  test('PUT: update submission status', async () => {
    const customerDeets = await CustomerModel.insertOne(custData)
    const chequeCreateResult = await api.post("/api/cheques").set('Authorization', authString)
                                  .send({ ...chequeDataSingle, customer: customerDeets.id })
                                  .expect(201)

    assert.strictEqual(chequeCreateResult.body.submitted, false)

    await api.put(`/api/cheques/${chequeCreateResult.body.id}/submit`)
              .set('Authorization', authString).expect(204)

    const chequeAfterSubmission = await api.get(`/api/cheques/${chequeCreateResult.body.id}`)
                                  .set('Authorization', authString).expect(200)

    assert.strictEqual(chequeAfterSubmission.body.id, chequeCreateResult.body.id)
    assert.strictEqual(chequeAfterSubmission.body.submitted, true)
  })

  test('PUT: change realisation date', async () => {
    const customerDeets = await CustomerModel.insertOne(custData)
    const chequeCreateResult = await api.post("/api/cheques").set('Authorization', authString)
                                  .send({ ...chequeDataSingle, customer: customerDeets.id })
                                  .expect(201)

    await api.put(`/api/cheques/${chequeCreateResult.body.id}/realdate`)
              .set('Authorization', authString).send({ date: "2027-04-05" }).expect(204)

    const chequeAfterDateChange = await api.get(`/api/cheques/${chequeCreateResult.body.id}`)
                                  .set('Authorization', authString).expect(200)
                  
    assert.strictEqual(chequeAfterDateChange.body.id, chequeCreateResult.body.id)
    assert.strictEqual(chequeAfterDateChange.body.realisation_date.slice(0, 10), "2027-04-05")
  })

  test('DELETE: check for successful deletion', async () => {
    const customerDeets = await CustomerModel.insertOne(custData)
    const chequeCreateResult = await api.post("/api/cheques").set('Authorization', authString)
                                  .send({ ...chequeDataSingle, customer: customerDeets.id })
                                  .expect(201)

    await api.delete(`/api/cheques/${chequeCreateResult.body.id}`)
              .set('Authorization', authString).expect(204)

    await api.get(`/api/cheques/${chequeCreateResult.body.id}`)
            .set('Authorization', authString).expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
