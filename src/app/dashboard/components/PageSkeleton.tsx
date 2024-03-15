import React from 'react';
import Card from '@/components/Card';
import { Skeleton } from '@/components/ui/skeleton';

const PageSkeleton = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-5 gap-4 items-stretch lg:items-start h-full">
      <Card className="col-span-2 flex-col items-center ring-1 ring-gray-300 shadow-lg py-16">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="flex flex-col gap-2 mb-8 mt-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-10 w-60" />
          <Skeleton className="h-10 w-60" />
          <Skeleton className="h-10 w-60" />
        </div>
      </Card>
      <div className="col-span-3 flex flex-col gap-4">
        <Card className="flex flex-col gap-4 p-6">
          <Skeleton className="h-10 w-60" />
          <Skeleton className="h-8 w-60 md:w-96" />
          <Skeleton className="h-48 w-full" />
        </Card>
        <Card className="flex flex-col gap-4 p-6">
          <Skeleton className="h-10 w-60" />
          <Skeleton className="h-8 w-60 md:w-96" />
          <Skeleton className="h-48 w-full" />
        </Card>
      </div>
    </div>
  );
};

export default PageSkeleton;
