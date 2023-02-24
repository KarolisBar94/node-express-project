export type WheelModel = {
  id: string;
  brand: string;
  style: string;
  price: number;
  rating: number;
  images: string[];
};

export type WheelData = Omit<WheelModel, 'id'>;

export type PartialWheelData = Partial<WheelData>;
