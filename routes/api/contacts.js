import express from 'express';
import contactsControllers from '../../controllers/contacts-controller.js';
import isValidId from '../../middlewares/isValidId.js';
import isEmptyBody from '../../middlewares/isEmptyBody.js';

const contactsRouter = express.Router();

contactsRouter.get('/', contactsControllers.getAll);

contactsRouter.get('/:id', isValidId, contactsControllers.getById);

contactsRouter.post('/', isEmptyBody, contactsControllers.add);

contactsRouter.delete('/:id', isValidId, contactsControllers.deleteById);

contactsRouter.put('/:id', isEmptyBody, isValidId, contactsControllers.update);

export default contactsRouter;
