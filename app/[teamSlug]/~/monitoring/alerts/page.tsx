import { Suspense } from 'react';
import {
  MonitoringAlertsPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function MonitoringAlertsPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring/alerts'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <MonitoringAlertsPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
