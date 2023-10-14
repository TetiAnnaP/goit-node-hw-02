import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleSaveError, runValidatorsAtUpdate } from './hooks.js';

const emailRegexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
  },
  { versionKey: false, timestamps: true }
);

export const userSignupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(4).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(4).required(),
});

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', runValidatorsAtUpdate);
userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
