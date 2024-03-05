import { Link2 } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href={'/'} className="flex items-center gap-2">
      <Link2 className="text-primary" />
      <span className="font-semibold text-lg">DevLink</span>
    </Link>
  );
};

export default Logo;
