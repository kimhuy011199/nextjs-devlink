import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = (props: CardProps) => {
  const { children, className = '' } = props;

  return (
    <div className={twMerge('bg-white rounded-xl flex shadow-sm', className)}>
      {children}
    </div>
  );
};

export default Card;
