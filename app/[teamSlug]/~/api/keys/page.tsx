import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function ApiKeysPage({
  params,
}: PageProps<'/[teamSlug]/~/api/keys'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/api/keys" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
