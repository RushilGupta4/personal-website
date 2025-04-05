import Script from 'next/script';
import { baseUrl } from '@/lib/constants';

interface SchemaDataProps {
  data: Record<string, any> | Record<string, any>[];
}

const SchemaData = ({ data }: SchemaDataProps): JSX.Element => {
  // Handle array of schema objects
  if (Array.isArray(data)) {
    const schemaArray = data.map(item => processSchemaItem(item));

    return (
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaArray)
        }}
      />
    );
  }

  // Handle single schema object
  const processedData = processSchemaItem(data);

  return (
    <Script
      id="schema-org"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(processedData)
      }}
    />
  );
};

// Helper function to process schema items
function processSchemaItem(item: Record<string, any>): Record<string, any> {
  const processedItem = { ...item };

  // Add context if not present
  if (!processedItem['@context']) {
    processedItem['@context'] = 'https://schema.org';
  }

  // Process URL
  if (processedItem.url && !processedItem.url.startsWith('http')) {
    processedItem.url = processedItem.url.startsWith('/') ? `${baseUrl}${processedItem.url}` : `${baseUrl}/${processedItem.url}`;
  }

  return processedItem;
}

export default SchemaData;
