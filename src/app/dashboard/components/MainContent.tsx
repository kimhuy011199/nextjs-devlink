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
    .min(4, {
      message: 'Name must be at least 4 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  bio: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(120, {
      message: 'Bio must not be longer than 120 characters.',
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
  profilePath: string;
}

const MainContent = (props: MainContentProps) => {
  const { formValues, profilePath } = props;
  const { toast } = useToast();
  const { userId } = useAuth();
  const [removedIds, setRemoveIds] = useState<any[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues,
    mode: 'onSubmit',
  });

  const fullName = form.watch('fullName') || '';
  const bio = form.watch('bio') || '';
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

  const setAvatarValue = (url: string) => {
    form.setValue('avatar', url, { shouldDirty: true });
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
      method: 'PUT',
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
          variant: 'destructive',
        });
      });
  };

  return (
    <div className="grid grid-cols-5 gap-4 items-start h-full">
      <ProfileSection
        profilePath={profilePath}
        fullName={fullName}
        bio={bio}
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
          <ProfileForm
            form={form}
            avatar={avatar}
            setAvatarValue={setAvatarValue}
          />
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
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MainContent;
