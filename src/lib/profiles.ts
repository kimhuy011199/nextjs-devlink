import { auth, currentUser } from '@clerk/nextjs';
import { db } from '@/lib/db';

const DEFAULT_PROFILE = {
  fullName: '',
  email: '',
  avatar: '',
  urls: [],
  username: '',
  userId: 'default_user_id',
  id: 'default_id',
};

export const getCurrentProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return DEFAULT_PROFILE;
  }

  const profile = (await db.profile.findUnique({
    where: {
      userId,
    },
    include: {
      urls: true,
    },
  })) as any;

  if (profile) {
    console.log('profile', { profile });
    return profile;
  }

  const user = await currentUser();
  if (user) {
    const fullName =
      user?.firstName && user?.lastName && `${user.firstName} ${user.lastName}`;
    const newProfile = await db.profile.create({
      data: {
        userId,
        username: '',
        email: user.emailAddresses[0].emailAddress,
        fullName: fullName || '',
        avatar: user?.imageUrl || '',
      },
    });

    console.log('...newProfile, urls: []', { ...newProfile, urls: [] });

    return { ...newProfile, urls: [] };
  }

  return DEFAULT_PROFILE;
};

export const getProfileByUsername = async (username: string) => {
  const profile = await db.profile.findFirst({
    where: {
      username: username,
    },
    include: {
      urls: true,
    },
  });

  if (!profile) {
    return null;
  }

  return profile;
};
