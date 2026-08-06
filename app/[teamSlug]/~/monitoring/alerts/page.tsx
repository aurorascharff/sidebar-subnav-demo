import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function MonitoringAlertsPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring/alerts'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/monitoring/alerts" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
