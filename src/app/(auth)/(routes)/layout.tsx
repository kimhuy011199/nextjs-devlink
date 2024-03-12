const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col pt-12 justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
