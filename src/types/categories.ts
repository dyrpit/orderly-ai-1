export type TCategories = {
  id: number;
  categoryName: TCategoriesNames;
  backgroundColor: string;
  href: string;
  products: TProduct[];
};

export type TCategoriesNames =
  | 'writing'
  | 'productivity'
  | 'video generating'
  | 'image generating'
  | 'chatbots'
  | 'marketing';

export type TProduct = {
  id: number;
  name: string;
  category: TCategoriesNames;
  websiteURL?: string;
  videoURL?: string;
  cost?: 'free' | 'paid';
  description?: string;
};
