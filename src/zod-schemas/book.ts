import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().trim().min(2, {
    message: "Title must be at least two characters.",
  }),
  description: z
    .string()
    .trim()
    .min(10, {
      message: "Description must be at least ten characters.",
    })
    .max(500, {
      message: "Description must be no longer than 500 characters.",
    }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Max file size is 5MB"),
  author: z.string().trim().min(3, {
    message: "Author must be at least three characters.",
  }),
  category: z.string().trim().min(2, {
    message: "Category must be at least three characters.",
  }),
  price: z.coerce
    .number()
    .refine((n) => n > 0, {
      message: "Price must be positive",
    })
    .refine((n) => /^\d+(\.\d{1,2})?$/.test(n.toString()), {
      message: "Price must have up to 2 decimal points",
    }),
  countInStock: z.coerce
    .number()
    .int("Count in stock must be an integer")
    .nonnegative("Count in stock must be a non-negative number"),
});

export type BookSchema = z.infer<typeof bookSchema>;
