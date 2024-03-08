import { auth, currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';

const DEFAULT_PROFILE = {
  fullName: '',
  email: '',
  avatar: '',
  urls: [],
  username: 'default_username',
  userId: 'default_user_id',
  id: 'default_id',
};

export const getCurrentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return DEFAULT_PROFILE;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  if (profile) {
    const urls =
      ((await db.link.findMany({
        where: {
          profileId: profile.id,
        },
        orderBy: {
          order: 'asc',
        },
      })) as []) || [];
    return { ...profile, urls };
  }

  const user = await currentUser();
  if (user) {
    const fullName =
      user?.firstName && user?.lastName && `${user.firstName} ${user.lastName}`;
    const newProfile = await db.profile.create({
      data: {
        userId,
        username: userId,
        email: user.emailAddresses[0].emailAddress,
        fullName: fullName || '',
        avatar: user?.imageUrl || '',
      },
    });

    return { ...newProfile, urls: [] };
  }

  return DEFAULT_PROFILE;
};

export const getProfileByUsername = () => {};

export const updateProfile = async () => {};
