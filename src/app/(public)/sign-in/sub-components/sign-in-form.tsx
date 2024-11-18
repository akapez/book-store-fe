"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "@validations/sign-in";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";

const SignInForm = () => {
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    // formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    // call the server action
    console.log(data);
  };

  return (
    <Card className="mx-auto mt-20 max-w-xs md:max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle
          className="text-2xl font-bold"
          role="heading"
          id="sign-in-card-header"
        >
          Sign In
        </CardTitle>
        <CardDescription id="sign-in-card-description">
          Welcome back to Booktopia!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button id="sign-in-btn" className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter
        id="sign-up-card-footer"
        className="flex justify-center text-sm"
      >
        Don&apos;t have an account?
        <Link href="/sign-up">
          <Button id="sign-up-btn" variant="link">
            Sign Up
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
