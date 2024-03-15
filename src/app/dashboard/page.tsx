'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MainContent from '@/app/dashboard/components/MainContent';
import { useToast } from '@/components/ui/use-toast';
import PageSkeleton from './components/PageSkeleton';

export default function Dashboard() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const profilePath = `/profiles/${profileData?.username}`;
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/profiles')
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        if (!data?.username) {
          return router.push('/register');
        }
        setProfileData(data);
        setIsLoading(false);
      })
      .catch(() => {
        toast({
          description: 'Something went wrong. Please try again!',
          variant: 'destructive',
        });
      });
  }, [router, toast]);

  if (isLoading) {
    return <PageSkeleton />;
  }

  return (
    <>
      {profileData ? (
        <MainContent formValues={profileData} profilePath={profilePath} />
      ) : null}
    </>
  );
}
