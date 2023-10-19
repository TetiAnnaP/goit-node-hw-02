import Contact from '../models/Contact.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';

import HttpError from '../helpers/HttpError.js';

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'username email');
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const add = async (req, res) => {
  // console.log(req.user);
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findBOneAndDelete({ _id: id, owner });
  if (!result) {
    throw HttpError(404, message);
  }
  res.json({
    message: 'Delete success',
  });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findByIdAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });
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
