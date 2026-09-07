import { baseUrl } from '@/lib/constants';

type SchemaItem = Record<string, unknown>;

function processSchemaItem(item: SchemaItem): SchemaItem {
  return {
    '@context': 'https://schema.org',
    ...item,
    ...(typeof item.url === 'string' ? { url: new URL(item.url, baseUrl).href } : {})
  };
}

export default function SchemaData({ data }: { data: SchemaItem | SchemaItem[] }) {
  const schema = Array.isArray(data) ? data.map(processSchemaItem) : processSchemaItem(data);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />;
}
