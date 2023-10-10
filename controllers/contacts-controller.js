import Contact from '../models/Contact.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
// import { contactAddSchema } from '../routes/api/';
import HttpError from '../helpers/HttpError.js';

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const add = async (req, res) => {
  // if (!Object.keys(req.body).length) {
  //   throw HttpError(400, 'All fields are empty');
  // }

  // const { error } = contactAddSchema.validate(req.body);

  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, message);
  }
  res.json({
    message: 'Delete success',
  });
};

const update = async (req, res) => {
  // if (!Object.keys(req.body).length) {
  //   throw HttpError(400, 'All fields are empty');
  // }

  // const { error } = contactAddSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }

  const { id } = req.params;

  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  update: ctrlWrapper(update),
};
