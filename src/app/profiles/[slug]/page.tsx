import { notFound } from 'next/navigation';
import ProfileSection from '@/components/ProfileSection';
import { getProfileByUsername } from '@/lib/profiles';

export default async function ProfileDetail({
  params,
}: {
  params: { slug: string };
}) {
  const profileData = await getProfileByUsername(params.slug);
  if (!profileData) {
    notFound();
  }

  const { username, bio, fullName, email, avatar, urls } = profileData;
  const profilePath = `/profiles/${username}`;

  return (
    <>
      <div className="w-full h-80 bg-primary absolute left-0 top-0"></div>
      <ProfileSection
        profilePath={profilePath}
        fullName={fullName}
        bio={bio}
        email={email}
        avatar={avatar}
        links={urls}
        className="sm:w-96 mx-auto mt-4"
      />
    </>
  );
}
