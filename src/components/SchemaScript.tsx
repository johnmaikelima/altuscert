import { organizationSchema, productSchemaA1PJ, productSchemaA1PF } from '@/app/schema';

export function SchemaScript() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemaA1PJ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemaA1PF) }}
      />
    </>
  );
}
