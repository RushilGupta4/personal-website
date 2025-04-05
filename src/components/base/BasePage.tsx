import { Metadata } from 'next';
import { baseUrl } from '@/lib/constants';
import SchemaData from '@/components/SchemaData';

interface BasePageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  jsonLd?: Record<string, any>;
}

export function generateMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: baseUrl
    }
  };
}

const BasePage = ({ title, description, children, jsonLd }: BasePageProps): JSX.Element => {
  return (
    <div className="min-h-screen">
      {jsonLd && <SchemaData data={jsonLd} />}

      <div className="py-8 md:py-12">
        <div className="mb-8 md:mb-12 animate-fade-in">
          {/* Header */}
          <div className="mb-6 md:mb-10">
            <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-primary-light">{title}</span>
            </h1>

            {description && (
              <p className="text-center mt-6 mx-auto max-w-3xl text-text-secondary font-normal text-base md:text-lg opacity-90">{description}</p>
            )}
          </div>
        </div>

        <div className="animate-slide-up">{children}</div>
      </div>
    </div>
  );
};

export default BasePage;
