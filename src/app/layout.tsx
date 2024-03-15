import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import './globals.css';
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'Dev Link - Everything you are. In one, simple link in bio.',
  description:
    'Create and showcase your profile on DevLink. Share your expertise, projects, and skills with the world. Publicize your profile to gain visibility in the developer community. Join DevLink today!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={GeistSans.className}>
          <main className="bg-gray-100 w-full p-6 min-h-screen">
            <div className="mx-auto max-w-5xl flex flex-col gap-4">
              <Header />
              {children}
            </div>
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
