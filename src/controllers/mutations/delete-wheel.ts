import { RequestHandler } from 'express';
import { WheelModel } from '../types';
import wheels from '../wheels-data';

export const deleteWheel: RequestHandler<
  { id: string | undefined },
  WheelModel | ResponseError,
  {},
  {}
> = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  const foundWheelIndex = wheels.findIndex((wheel) => wheel.id === id);

  if (foundWheelIndex === -1) {
    res.status(400).json({ error: `wheel was not found with id '${id}'` });
    return;
  }

  const [deletedWheel] = wheels.splice(foundWheelIndex, 1);

  res.status(204).json(deletedWheel);
};
