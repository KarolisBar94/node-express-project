import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import { WheelModel, PartialWheelData } from '../types';
import wheels from '../wheels-data';
import partialWheelDataValidationSchema from '../validation-schemas/wheel-data-validation-schema';

export const updateWheel: RequestHandler<
  { id: string | undefined },
  WheelModel | ResponseError,
  PartialWheelData,
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

  try {
    const partialWheelData = partialWheelDataValidationSchema.validateSync(
      req.body,
      { abortEarly: false },
    );
    const foundWheel = wheels[foundWheelIndex];

    const updatedWheel = {
      ...foundWheel,
      ...partialWheelData,
    };

    wheels.splice(foundWheelIndex, 1, updatedWheel);

    res.status(200).json(updatedWheel);
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
