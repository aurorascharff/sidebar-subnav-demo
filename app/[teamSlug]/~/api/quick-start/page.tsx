import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function ApiQuickStartPage({
  params,
}: PageProps<'/[teamSlug]/~/api/quick-start'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/api/quick-start" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
