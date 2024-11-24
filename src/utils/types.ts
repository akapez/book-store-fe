export type Book = {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
  category: string;
  price: number;
  count_in_stock: number;
  user_id?: string;
};
