import express from 'express';
import { createWheel } from './mutations/create-wheel';
import { deleteWheel } from './mutations/delete-wheel';
import { updateWheel } from './mutations/update-wheel';
import { getWheel } from './queries/get-wheel';
import { getWheels } from './queries/get-wheels';

const wheelsRouter = express.Router();

wheelsRouter.get('/', getWheels);
wheelsRouter.get('/:id', getWheel);
wheelsRouter.post('/', createWheel);
wheelsRouter.patch('/:id', updateWheel);
wheelsRouter.delete('/:id', deleteWheel);

export default wheelsRouter;
