import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function ApiProvidersPage({
  params,
}: PageProps<'/[teamSlug]/~/api/providers'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/api/providers" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
