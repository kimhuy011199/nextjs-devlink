import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileLinkItem from './ProfileLinkItem';
import { Badge } from '@/components/ui/badge';
import Card from './Card';
import ShareLink from './ShareLink';
import { twMerge } from 'tailwind-merge';

interface ProfileSectionProps {
  profilePath: string;
  bio: string;
  fullName: string;
  email: string;
  avatar?: string;
  links: {
    link: string;
    platform: string;
  }[];
  previewMode?: boolean;
  className?: string;
}

const ProfileSection = (props: ProfileSectionProps) => {
  const {
    profilePath,
    fullName,
    bio,
    email,
    links,
    avatar = '',
    previewMode = false,
    className = '',
  } = props;

  return (
    <Card
      className={twMerge(
        'overflow-hidden col-span-2 flex-col items-center sticky top-4 ring-1 ring-gray-300 shadow-lg',
        className
      )}
    >
      <div className="flex items-center justify-between w-full px-2 pt-2">
        <div>
          {previewMode ? (
            <Badge variant="outline" className="mx-2">
              Preview
            </Badge>
          ) : null}
        </div>
        <ShareLink profilePath={profilePath} />
      </div>
      <div className="px-10 pt-4 pb-12 w-full flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 leading-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatar} alt="@devlink" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          {fullName ? (
            <span className="text-lg font-semibold text-center line-clamp-1 px-2">
              {fullName}
            </span>
          ) : (
            <div className="mt-1 h-6 w-48 bg-gray-100 rounded-md"></div>
          )}
          <span className="text-gray-500 text-sm text-center px-2">{bio}</span>
        </div>
        {email ? (
          <div className="flex items-center justify-center gap-2 px-2 mb-2">
            <Mail className="text-primary" size={16} />
            <Link
              href={`mailto:${email}`}
              className="text-gray-700 line-clamp-1"
            >
              {email}
            </Link>
          </div>
        ) : (
          <div className="h-6 w-60 bg-gray-100 rounded mb-2"></div>
        )}
        <ul className="flex flex-col gap-3 w-full items-center">
          {links.map((item, index) => (
            <ProfileLinkItem
              key={index}
              link={item.link}
              platform={item.platform}
            />
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default ProfileSection;
