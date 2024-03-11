import { redirect } from 'next/navigation';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs';
import Header from '@/components/Header';

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <>
      <Header />
      <div className="grid grid-cols-2 gap-20 mt-12 px-8">
        <div className="flex flex-col gap-4 justify-center items-start">
          <h2 className="text-3xl font-bold max-w-96">
            Build Your Online Identity Hassle-Free!
          </h2>
          <p className="text-sm text-gray-500 pb-2">
            Create your ideal online profile in a breeze! From name and email to
            avatar and social links, we&apos;ve got it all. Generate a QR code
            for easy sharing. Start now and shine online!
          </p>
          <Link
            className="py-3 px-5 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90"
            href="/dashboard"
          >
            Get Started
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="bg-white rounded-xl ring-1 ring-gray-300 h-[460px] w-80 shadow-xl"></div>
        </div>
      </div>
    </>
  );
}
