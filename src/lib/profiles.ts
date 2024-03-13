import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

export const getCurrentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }

  const profile = (await db.profile.findUnique({
    where: {
      userId,
    },
    include: {
      urls: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  })) as any;

  return profile;
};

export const getProfileByUsername = async (username: string) => {
  const profile = await db.profile.findFirst({
    where: {
      username: username,
    },
    include: {
      urls: {
        orderBy: {
          order: 'asc',
        },
      },
    },
  });

  return profile;
};
