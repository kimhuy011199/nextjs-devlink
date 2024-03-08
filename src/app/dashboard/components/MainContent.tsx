'use client';

import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { v4 as uuidv4 } from 'uuid';
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
        id: z.string(),
        link: z.string().url({ message: 'Please enter a valid URL.' }),
        platform: z.string(),
        order: z.number().optional(),
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
  const { userId } = useAuth();
  const [removedIds, setRemoveIds] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
    mode: 'onSubmit',
  });

  const fullName = form.watch('fullName') || '';
  const email = form.watch('email') || '';
  const avatar = form.watch('avatar') || '';
  const links = form.watch('urls') || [];

  const { append, remove, replace } = useFieldArray({
    name: 'urls',
    control: form.control,
    keyName: '_id',
  });

  const appendField = () => {
    append({ id: uuidv4(), platform: PLATFORMS[0].value, link: '' });
  };

  const removeField = (index: number, id: string) => {
    setRemoveIds((prev) => [...prev, id]);
    remove(index);
  };

  const onSubmit = async (data: FormValues) => {
    const { urls, ...profile } = data;
    const orderedUrls = urls?.map((item, index) => ({ ...item, order: index }));
    const requestBody = {
      profile,
      urls: orderedUrls,
      removedIds,
    };

    await fetch(`/api/profiles/${userId}`, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          description: 'Your changes have been successfully saved!',
        });
      })
      .catch(() => {
        toast({
          description: 'Something went wrong. Please try again!',
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
            replace={replace}
            fields={links}
            form={form}
          />
          <Button
            type="submit"
            className="self-end"
            disabled={form.formState.isSubmitting}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MainContent;
