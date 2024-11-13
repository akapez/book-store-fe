import img1984 from "@assets/images/book-1984.jpg";
import gatsby from "@assets/images/gatsby.jpg";
import hobbit from "@assets/images/hobbit.jpg";
import mobydick from "@assets/images/mobydick.jpg";
import mockingbird from "@assets/images/mockingbird.jpg";
import pride from "@assets/images/pride.webp";
import warandpeace from "@assets/images/warandpeace.jpg";

export const books = [
  {
    id: "1",
    title: "The Great Gatsby",
    image: gatsby.src,
    description: "A novel written by American author F. Scott Fitzgerald.",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    price: 10.99,
    countInStock: 15,
    rating: 4.7,
    numReviews: 1250,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    image: mockingbird.src,
    description: "A novel by Harper Lee published in 1960.",
    author: "Harper Lee",
    category: "Fiction",
    price: 7.99,
    countInStock: 20,
    rating: 4.8,
    numReviews: 2350,
  },
  {
    id: "3",
    title: "1984",
    image: img1984.src,
    description: "A dystopian social science fiction novel by George Orwell.",
    author: "George Orwell",
    category: "Science Fiction",
    price: 8.99,
    countInStock: 30,
    rating: 4.6,
    numReviews: 1825,
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    image: pride.src,
    description: "A romantic novel by Jane Austen, published in 1813.",
    author: "Jane Austen",
    category: "Romance",
    price: 6.99,
    countInStock: 12,
    rating: 4.9,
    numReviews: 2500,
  },
  {
    id: "5",
    title: "The Hobbit",
    image: hobbit.src,
    description: "A children's fantasy novel by J. R. R. Tolkien.",
    author: "J. R. R. Tolkien",
    category: "Fantasy",
    price: 9.99,
    countInStock: 18,
    rating: 4.7,
    numReviews: 2100,
  },
  {
    id: "6",
    title: "Moby-Dick",
    image: mobydick.src,
    description: "A novel by Herman Melville, published in 1851.",
    author: "Herman Melville",
    category: "Adventure",
    price: 11.99,
    countInStock: 8,
    rating: 4.3,
    numReviews: 890,
  },
  {
    id: "7",
    title: "War and Peace",
    image: warandpeace.src,
    description: "A novel by Leo Tolstoy, first published from 1865 to 1869.",
    author: "Leo Tolstoy",
    category: "Historical Fiction",
    price: 12.99,
    countInStock: 5,
    rating: 4.8,
    numReviews: 980,
  },
];
