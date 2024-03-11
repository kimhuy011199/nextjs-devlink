import Link from 'next/link';
import Logo from './Logo';
import ProfileQRCode from './ProfileQRCode';
import ShareLink from './ShareLink';
import AuthButton from './AuthButton';
import Card from './Card';

interface HeaderProps {
  profilePath?: string;
  isEditMode?: boolean;
}

const Header = (props: HeaderProps) => {
  const { profilePath = '', isEditMode = false } = props;

  return (
    <Card className="py-4 px-5 justify-between items-center h-16">
      <h1>
        <Logo />
      </h1>
      <div className="flex gap-4">
        {isEditMode ? (
          <Link
            className="px-5 py-2 flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-gray-500 hover:bg-primary/10 hover:text-primary"
            href={profilePath}
          >
            View Your Profile
          </Link>
        ) : null}
      </div>
      <div className="w-28 flex justify-end">
        <AuthButton />
      </div>
    </Card>
  );
};

export default Header;
