"use client";

import { useRouter } from "next/navigation";

import { updateUser } from "@actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@hooks/useToast";
import { UserSchema, userSchema } from "@lib/zod-schemas/user";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
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

const UserUpdateForm = () => {
  const { update } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first: "",
      last: "",
      image: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form;

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first);
    formData.append("last_name", data.last);
    if (data.image) {
      formData.append("file", data.image);
    }
    const response = await updateUser(formData);
    if (response.success) {
      await update({
        firstName: response.data?.firstName,
        lastName: response.data?.lastName,
        image: response.data?.image,
      });
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
    <div className="mx-auto mt-20 max-w-xs md:max-w-sm">
      <h2 className="mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Update Profile
      </h2>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={control}
              name="first"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="first-name">First Name</FormLabel>
                  <FormControl>
                    <Input
                      id="first-name"
                      type="text"
                      placeholder="First Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="last"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="last-name">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      id="last-name"
                      type="text"
                      placeholder="Last Name"
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
            id="profile-update-btn"
            className="w-full"
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserUpdateForm;
