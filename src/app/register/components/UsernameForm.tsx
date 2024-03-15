'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  username: z
    .string()
    .min(5, {
      message: 'Username must be at least 5 characters.',
    })
    .max(20, {
      message: 'Username must not be longer than 20 characters.',
    })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Only letters (a-z) and numbers (0-9) are allowed.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const UsernameForm = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
    mode: 'onSubmit',
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: FormValues) => {
    const username = data.username.trim().toLowerCase();
    await fetch('/api/profiles', {
      method: 'POST',
      body: JSON.stringify({ username }),
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            form.setError('username', {
              type: 'custom',
              message: 'This username is already taken. Try another one!',
            });
          } else {
            throw new Error();
          }
        } else {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          window.location.reload();
        }
      })
      .catch(() => {
        toast({
          description: 'Something went wrong. Please try again!',
          variant: 'destructive',
        });
      });
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-lg mx-auto pt-10">
      <h2 className="text-2xl font-semibold leading-none tracking-tight">
        Create Your Profile
      </h2>
      <p className="text-sm text-muted-foreground">
        Provide a unique username that will be used to identify you on the
        platform. Everyone can see you at:
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 col-span-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <div className="relative">
                    <span className="absolute top-2.5 left-4 text-sm text-gray-600">
                      DevLink.app/
                    </span>
                    <Input
                      className="pl-28"
                      placeholder="yourname"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end" disabled={isSubmitting}>
            Create Profile
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UsernameForm;
