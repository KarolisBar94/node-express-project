import { RequestHandler } from 'express';
import { WheelModel } from '../types';
import wheels from '../wheels-data';

export const getWheel: RequestHandler<
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

  const foundWheel = wheels.find((wheel) => wheel.id === id);

  if (foundWheel === undefined) {
    res.status(400).json({ error: `wheel was not found with id '${id}'` });
    return;
  }

  res.status(200).json(foundWheel);
};
