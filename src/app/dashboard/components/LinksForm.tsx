import React from 'react';
import { GanttChart, Link, Plus } from 'lucide-react';
import FormSection from './FormSection';
import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PLATFORMS } from '@/shared/constants';

interface LinksFormProps {
  appendField: () => void;
  removeField: (index: number) => void;
  fields: any[];
  form: any;
}

const LIMITED_LINKS = 7;

const LinksForm = (props: LinksFormProps) => {
  const { appendField, removeField, fields, form } = props;

  return (
    <FormSection
      title="Customize Your Links"
      description="Add/edit/remove links below and then share all your profiles with
            the world!"
    >
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="bg-gray-100 p-4 rounded-md flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                <GanttChart size={16} />
                <span>Link #{index + 1}</span>
              </span>
              <Button
                variant="ghost"
                type="button"
                className="h-0 p-0 font-normal text-xs text-gray-500"
                onClick={() => removeField(index)}
              >
                Remove
              </Button>
            </div>
            <FormField
              control={form.control}
              name={`urls.${index}.platform`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Platform</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a platform to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PLATFORMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <SelectItem key={item.id} value={item.value}>
                            <div className="flex items-center gap-3">
                              <Icon size={16} strokeWidth={2} />
                              <span>{item.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`urls.${index}.link`}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-sm">Link</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Link
                        size={14}
                        strokeWidth={2.5}
                        className="absolute bottom-3 left-3.5"
                      />
                      <Input {...field} className="m-0 pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>
      <Button
        variant="outline"
        type="button"
        className="my-4 flex w-full"
        onClick={appendField}
        disabled={fields?.length > LIMITED_LINKS}
      >
        <Plus size={14} strokeWidth={3} />
        <span className="pl-1">Add new link</span>
      </Button>
    </FormSection>
  );
};

export default LinksForm;
