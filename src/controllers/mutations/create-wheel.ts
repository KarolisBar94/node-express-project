import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import createId from 'uniqid';
import { WheelModel, WheelData } from '../types';
import wheels from '../wheels-data';
import wheelDataValidationSchema from '../validation-schemas/wheel-data-validation-schema';

export const createWheel: RequestHandler<
{},
WheelModel | ResponseError,
WheelData,
{}
> = (req, res) => {
  try {
    const wheelData = wheelDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const newWheel: WheelModel = { id: createId(), ...wheelData };
    wheels.push(newWheel);

    res.status(201).json(newWheel);
  } catch (err) {
    if (err instanceof ValidationError) {
      const manyErrors = err.errors.length > 1;
      res.status(400).json({
        error: manyErrors ? 'Validation errors' : err.errors[0],
        errors: manyErrors ? err.errors : undefined,
      });
    } else if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
