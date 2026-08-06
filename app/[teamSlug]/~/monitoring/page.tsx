import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function MonitoringPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/monitoring" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
