'use client';

import React from 'react';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PLATFORMS } from '@/shared/constants';
import { Button } from '../../../components/ui/button';
import { Form } from '../../../components/ui/form';
import ProfileSection from '../../../components/ProfileSection';
import ProfileForm from './ProfileForm';
import LinksForm from './LinksForm';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  avatar: z.string().optional(),
  urls: z
    .array(
      z.object({
        link: z.string().url({ message: 'Please enter a valid URL.' }),
        platform: z.string(),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface MainContentProps {
  formValues: FormValues;
}

const MainContent = (props: MainContentProps) => {
  const { formValues } = props;
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
    mode: 'onSubmit',
  });

  const fullName = form.watch('fullName') || '';
  const email = form.watch('email') || '';
  const avatar = form.watch('avatar') || '';
  const links = form.watch('urls') || [];

  const { fields, append, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  const appendField = () => {
    append({ platform: PLATFORMS[0].value, link: '' });
  };

  const removeField = (index: number) => {
    remove(index);
  };

  const onSubmit = (data: FormValues) => {
    console.log('data', data);
    fetch('http://localhost:3000/api/profiles/hellow', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((d: any) => {
        console.log('first', d);
        toast({
          description: 'Your changes have been successfully saved!',
        });
      });
  };

  return (
    <div className="grid grid-cols-5 gap-4 items-start h-full">
      <ProfileSection
        fullName={fullName}
        email={email}
        links={links}
        avatar={avatar}
        previewMode={true}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 col-span-3"
        >
          <ProfileForm form={form} avatar={avatar} />
          <LinksForm
            appendField={appendField}
            removeField={removeField}
            fields={fields}
            form={form}
          />
          <Button type="submit" className="self-end">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MainContent;
