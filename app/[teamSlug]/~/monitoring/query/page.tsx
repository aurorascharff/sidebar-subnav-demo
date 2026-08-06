import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function MonitoringQueryPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring/query'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/monitoring/query" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
