export type TProduct = {
  id: number | string;
  name: string;
  category: string;
  websiteURL?: string;
  videoURL?: string;
  cost?: 'free' | 'paid';
  description?: string;
};
