import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ProfileLinkItem from './ProfileLinkItem';
import { Badge } from '@/components/ui/badge';
import Card from './Card';

interface ProfileSectionProps {
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
  const { fullName, email, links, avatar = '', previewMode = false } = props;

  return (
    <Card className="col-span-2 flex-col items-center sticky top-4 ring-1 ring-gray-300 shadow-lg">
      {previewMode ? (
        <Badge variant="outline" className="absolute right-2 top-2">
          Preview
        </Badge>
      ) : null}
      <div className="px-10 py-16 w-full flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2 leading-5">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatar} alt="@huykim" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          {fullName ? (
            <span className="text-lg font-semibold">{fullName}</span>
          ) : (
            <div className="mt-1 h-6 w-48 bg-gray-100 rounded-md"></div>
          )}
          {email ? (
            <span className="text-gray-500 text-sm">{email}</span>
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
