import { Schema, model, type InferSchemaType/*, Types*/ } from 'mongoose';
//import type { MChequeType } from './cheque.ts';

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_document, returnedObject: Record<string, any>) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      return returnedObject
    }
  }
})

export type MCustomerType = InferSchemaType<typeof customerSchema>
export const CustomerModel = model<MCustomerType>('Customer', customerSchema);