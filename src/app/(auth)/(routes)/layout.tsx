import Logo from '@/components/Logo';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="py-4">
        <Logo />
      </div>
      <div className="flex flex-col gap-8 justify-center items-center">
        <h2 className="text-2xl font-semibold">Join DevLink for free!</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
