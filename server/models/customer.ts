import { Schema, model, type InferSchemaType, Types } from 'mongoose';
import type { MChequeType } from './cheque.ts';

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
  }/*,
  cheques: {
    type: [Schema.Types.ObjectId],
    ref: 'Cheque'
  }*/
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

export type MCustomerType = InferSchemaType<typeof customerSchema> & {
  cheques: Types.ObjectId | [MChequeType]; 
};
export const CustomerModel = model<MCustomerType>('User', customerSchema);