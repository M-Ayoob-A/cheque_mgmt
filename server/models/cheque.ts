import { Schema, model, type InferSchemaType, Types } from 'mongoose';
import type { MCustomerType } from './customer.ts';

const chequeSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  /*{
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  },*/
  submitted: {
    type: Boolean,
    required: true
  },
  agent: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  issue_date: {
    type: Date,
    required: true
  },
  realisation_date: {
    type: Date,
    required: true
  },
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

export type MChequeType = InferSchemaType<typeof chequeSchema> & {
  customer: Types.ObjectId | [MCustomerType]; 
};
export const ChequeModel = model<MChequeType>('Cheque', chequeSchema);

//module.exports = model('Cheque', chequeSchema)