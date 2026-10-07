import { Schema, model, type InferSchemaType/*, Types*/ } from 'mongoose';
//import type { MChequeType } from './cheque.ts';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
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
      delete returnedObject.passwordHash
      return returnedObject
    }
  }
})

export type MUserType = InferSchemaType<typeof userSchema>
export const UserModel = model<MUserType>('User', userSchema);