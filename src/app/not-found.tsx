import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dev Link - Not found',
};

export default function NotFound() {
  return (
    <div className="flex flex-col text-center justify-center items-center gap-6 mt-10">
      <p className="text-8xl font-semibold">404</p>
      <h2 className="uppercase text-xl font-semibold">Page Not Found</h2>
      <Link href="/" className="text-primary underline">
        Return Home
      </Link>
    </div>
  );
}
