import * as yup from 'yup';
import { PartialWheelData } from '../types';
import imagesSchema from './property-schemas/images-shemas';
import brandSchema from './property-schemas/brand-shemas';
import priceSchema from './property-schemas/price-shemas';
import ratingSchema from './property-schemas/rating-shemas';
import styleSchema from './property-schemas/style-shemas';

const partialWheelDataValidationSchema: yup.ObjectSchema<PartialWheelData> = yup.object({
  style: styleSchema,
  price: priceSchema(),
  rating: ratingSchema,
  images: imagesSchema,
  brand: brandSchema,
}).strict(true);

export default partialWheelDataValidationSchema;
