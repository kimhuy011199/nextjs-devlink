import { auth } from '@clerk/nextjs';

export const getCurrentProfile = () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  console.log('first', userId);

  const profile = {
    fullName: 'Huy Nguyen K',
    email: 'huy@email.com',
    avatar:
      'https://cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
    urls: [
      { link: 'https://github.com/st-huynguyen', platform: 'github' },
      { link: 'http://twitter.com/huykim', platform: 'twitter' },
    ],
    username: 'user_2dCkwwi0OnpQ3jeBqsaByLLRBJd',
    userId: 'user_2dCkwwi0OnpQ3jeBqsaByLLRBJd',
    id: '123',
  };

  return profile;
};

export const getProfileByUsername = () => {
  return null;
  return {
    fullName: 'Huy Nguyen K',
    email: 'huy@email.com',
    avatar:
      'https://cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
    urls: [
      { link: 'https://github.com/st-huynguyen', platform: 'github' },
      { link: 'http://twitter.com/huykim', platform: 'twitter' },
    ],
    username: 'user_2dCkwwi0OnpQ3jeBqsaByLLRBJd',
    userId: 'user_2dCkwwi0OnpQ3jeBqsaByLLRBJd',
    id: '123',
  };
};
