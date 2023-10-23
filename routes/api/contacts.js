import express from 'express';
import contactsControllers from '../../controllers/contacts-controller.js';
import {
  isValidId,
  isEmptyBody,
  authenticate,
  upload,
} from '../../middlewares/index.js';
import { contactAddSchema } from '../../models/Contact.js';
import { validateBody } from '../../decorators/index.js';

const contactAddValidate = validateBody(contactAddSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:id', isValidId, contactsControllers.getById);

contactsRouter.post(
  '/',
  upload.single('avatars'),
  isEmptyBody,
  contactAddValidate,
  contactsControllers.add
);

contactsRouter.delete('/:id', isValidId, contactsControllers.deleteById);

contactsRouter.put(
  '/:id',
  isEmptyBody,
  contactAddValidate,
  isValidId,
  contactsControllers.update
);

export default contactsRouter;
