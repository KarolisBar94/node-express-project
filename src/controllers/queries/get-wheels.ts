import { RequestHandler } from 'express';
import { WheelModel } from '../types';
import wheels from '../wheels-data';

export const getWheels: RequestHandler<
  {},
  WheelModel[],
  {},
  {}
> = (req, res) => {
  res.status(200).json(wheels);
};
