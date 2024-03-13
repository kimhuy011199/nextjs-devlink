import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileLinkItem from './ProfileLinkItem';
import { Badge } from '@/components/ui/badge';
import Card from './Card';
import ShareLink from './ShareLink';

interface ProfileSectionProps {
  profilePath: string;
  fullName: string;
  email: string;
  avatar?: string;
  links: {
    link: string;
    platform: string;
  }[];
  previewMode?: boolean;
}

const ProfileSection = (props: ProfileSectionProps) => {
  const {
    profilePath,
    fullName,
    email,
    links,
    avatar = '',
    previewMode = false,
  } = props;

  return (
    <Card className="col-span-2 flex-col items-center sticky top-4 ring-1 ring-gray-300 shadow-lg">
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
      <div className="px-10 pt-4 pb-12 w-full flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 leading-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatar} alt="@devlink" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          {fullName ? (
            <span className="text-lg font-semibold text-center">
              {fullName}
            </span>
          ) : (
            <div className="mt-1 h-6 w-48 bg-gray-100 rounded-md"></div>
          )}
          {email ? (
            <span className="text-gray-500 text-sm text-center">{email}</span>
          ) : (
            <div className="mt-1 h-4 w-28 bg-gray-100 rounded"></div>
          )}
        </div>
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
