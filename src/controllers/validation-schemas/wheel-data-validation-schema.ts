import * as yup from 'yup';
import { WheelData } from '../types';
import imagesSchema from './property-schemas/images-shemas';
import brandSchema from './property-schemas/brand-shemas';
import styleSchema from './property-schemas/style-shemas';
import priceSchema from './property-schemas/price-shemas';
import ratingSchema from './property-schemas/rating-shemas';

const wheelDataValidationSchema: yup.ObjectSchema<WheelData> = yup.object({
  style: styleSchema.required('style is required'),
  price: priceSchema(true),
  rating: ratingSchema.required('rating is required'),
  images: imagesSchema.required('images are required'),
  brand: brandSchema.required('brand is required'),
}).strict(true);

export default wheelDataValidationSchema;
