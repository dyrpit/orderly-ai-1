export type TProduct = {
  id: number;
  name: string;
  category: string;
  websiteURL?: string;
  videoURL?: string;
  cost?: 'free' | 'paid';
  description?: string;
};
