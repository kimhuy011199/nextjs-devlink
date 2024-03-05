import Card from '@/components/Card';
import { ReactNode } from 'react';

interface FormSectionProps {
  children: ReactNode;
  title: string;
  description: string;
}

const FormSection = (props: FormSectionProps) => {
  const { children, title, description } = props;

  return (
    <Card className="py-4 px-6 flex-col">
      <div className="flex flex-col gap-2 py-3">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>{children}</div>
    </Card>
  );
};

export default FormSection;
