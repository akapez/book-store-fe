import { z } from "zod";

export const userSchema = z.object({
  first: z.string().trim().min(3, {
    message: "First name must be at least three characters.",
  }),
  last: z.string().trim().min(3, {
    message: "Last name must be at least three characters.",
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, "Max file size is 5MB")
    .optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
