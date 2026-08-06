import { Suspense } from 'react';
import {
  MonitoringAlertRows,
  MonitoringAlertsPageContent,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function MonitoringAlertsPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring/alerts'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <MonitoringAlertsPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <MonitoringAlertRows />
      </Suspense>
    </MonitoringAlertsPageContent>
  );
}
