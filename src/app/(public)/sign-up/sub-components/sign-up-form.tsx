"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signUpSchema } from "@validations/sign-up";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

const SignUpForm = () => {
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first: "",
      last: "",
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    // formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    // call the server action
    console.log(data);
  };

  return (
    <Card className="mx-auto mb-40 mt-10 max-w-xs md:max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle
          className="text-2xl font-bold"
          role="heading"
          id="sign-up-card-header"
        >
          Sign Up
        </CardTitle>
        <CardDescription id="sign-up-card-description">
          Join the Booktopia Community
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Password must be 8 characters long and include at least
                      one uppercase letter, one lowercase letter, and one
                      numeric character.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button id="sign-up-btn" className="w-full" type="submit">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter
        id="sign-up-card-footer"
        className="flex justify-center text-sm"
      >
        Already have an account?
        <Link href="/sign-in">
          <Button id="sign-in-btn" variant="link">
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
