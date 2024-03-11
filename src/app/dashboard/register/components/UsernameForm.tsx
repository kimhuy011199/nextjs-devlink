'use client';

import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(20, {
      message: 'Username must not be longer than 20 characters.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const UsernameForm = () => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: FormValues) => {
    await fetch('/api/profiles', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok && res.status === 400) {
          form.setError('username', {
            type: 'custom',
            message: 'This username is already taken. Try another one!',
          });
        }
        return res.json();
      })
      .then(() => {
        router.push('/dashboard');
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <div>
      <div className="py-4">
        <Logo />
      </div>
      <div className="flex flex-col gap-3 w-full max-w-lg mx-auto pt-10">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Create your profile
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
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="self-end"
              disabled={form.formState.isSubmitting}
            >
              Create Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UsernameForm;
