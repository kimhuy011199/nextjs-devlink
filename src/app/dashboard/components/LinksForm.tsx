'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  removeField: (index: number, id: string) => void;
  replace: (items: any[]) => void;
  fields: any[];
  form: any;
  isSubmitting: boolean;
}

const LIMITED_LINKS = 8;

const LinksForm = (props: LinksFormProps) => {
  const { appendField, removeField, replace, fields, form, isSubmitting } =
    props;
  const [isMounted, setIsMounted] = useState(false);

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(fields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    replace(items);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <FormSection
      title="Customize Your Links"
      description="Add/edit/remove links below and then share all your profiles with
            the world!"
    >
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="links" isDropDisabled={isSubmitting}>
          {(provided) => (
            <ul
              className="flex flex-col"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {fields.map((field, index) => (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <li
                      className="bg-gray-100 p-4 rounded-md flex flex-col gap-2 mb-4"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
                          onClick={() => removeField(index, field.id)}
                          disabled={isSubmitting}
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
                              disabled={isSubmitting}
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
                                    <SelectItem
                                      key={item.id}
                                      value={item.value}
                                      disabled={isSubmitting}
                                    >
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
                                <Input
                                  disabled={isSubmitting}
                                  {...field}
                                  className="m-0 pl-10"
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="outline"
        type="button"
        className="my-4 flex w-full"
        onClick={appendField}
        disabled={fields?.length > LIMITED_LINKS || isSubmitting}
      >
        <Plus size={14} strokeWidth={3} />
        <span className="pl-1">Add new link</span>
      </Button>
    </FormSection>
  );
};

export default LinksForm;
