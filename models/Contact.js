import { Schema, model } from 'mongoose';
import { handleSaveError } from './hooks.js';
import Joi from 'joi';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSaveError);
contactSchema.post('findOneAndUpdate', handleSaveError);

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"name" required field`,
  }),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const Contact = model('contact', contactSchema);

export default Contact;
