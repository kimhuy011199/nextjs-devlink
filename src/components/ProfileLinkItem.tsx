import { twMerge } from 'tailwind-merge';
import { ExternalLink } from 'lucide-react';
import { PLATFORMS } from '@/shared/constants';

interface ProfileLinkItemProps {
  link: string;
  platform: string;
}

const ProfileLinkItem = (props: ProfileLinkItemProps) => {
  const { link, platform } = props;

  const platformIndex = PLATFORMS.findIndex((item) => item.value === platform);
  const profileLinkItem = { ...PLATFORMS[platformIndex] };
  profileLinkItem.link = link;

  const Icon = profileLinkItem.icon;

  return (
    <li
      className={twMerge(
        'py-2.5 px-4 rounded-md max-w-60 w-full',
        profileLinkItem.color
      )}
    >
      <a
        href={profileLinkItem.link}
        className="flex items-center justify-between text-white text-sm"
        target="_blank"
      >
        <span className="flex items-center gap-2">
          <Icon size={16} strokeWidth={2} />
          <span>{profileLinkItem.label}</span>
        </span>
        <ExternalLink size={14} />
      </a>
    </li>
  );
};

export default ProfileLinkItem;
