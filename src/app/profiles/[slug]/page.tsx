import Header from '@/components/Header';
import ProfileSection from '@/components/ProfileSection';

export default function ProfileDetail({
  params,
}: {
  params: { slug: string };
}) {
  console.log('params', params);
  const profileData = {
    fullName: 'Huy Nguyen K.',
    email: 'kimhuy011199@gmail.com',
    avatar:
      'https://cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
    urls: [
      { link: 'https://github.com/st-huynguyen', platform: 'github' },
      { link: 'http://twitter.com/huykim', platform: 'twitter' },
    ],
  };
  const { fullName, email, avatar, urls } = profileData;

  return (
    <>
      <Header
        profileUrl="http://localhost:3000/profiles/huykim"
        qrCodeUrl="http://localhost:3000/profiles/huykim"
      />
      <ProfileSection
        fullName={fullName}
        email={email}
        avatar={avatar}
        links={urls}
      />
    </>
  );
}
