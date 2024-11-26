"use client";

import { useRouter } from "next/navigation";

import { createBook } from "@actions/book";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@hooks/use-toast";
import { BookSchema, bookSchema } from "@validations/book";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

const BookCreateForm = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      category: "",
      price: 0,
      countInStock: 0,
      image: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit: SubmitHandler<BookSchema> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("author", data.author);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("count_in_stock", data.countInStock.toString());
    formData.append("file", data.image);

    const response = await createBook(formData);
    if (response.success) {
      reset();
      toast({
        title: response.message,
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: response.message,
      });
    }
  };

  return (
    <div className="mx-auto mb-40 mt-14 max-w-xs md:max-w-sm">
      <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Create Book
      </h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      type="text"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="author">Author</FormLabel>
                  <FormControl>
                    <Input
                      id="author"
                      type="text"
                      placeholder="Author"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <FormControl>
                    <Input
                      id="category"
                      type="text"
                      placeholder="Category"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <FormControl>
                    <Input
                      id="price"
                      type="number"
                      placeholder="price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="countInStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="countInStock">Count In Stock</FormLabel>
                  <FormControl>
                    <Input
                      id="countInStock"
                      type="number"
                      placeholder="Count In Stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="image">Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isSubmitting}
            id="book-create-btn"
            className="w-full"
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookCreateForm;
