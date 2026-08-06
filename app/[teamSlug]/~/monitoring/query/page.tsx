import { Suspense } from 'react';
import {
  MonitoringQueryPageContent,
  MonitoringQueryRows,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function MonitoringQueryPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring/query'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <MonitoringQueryPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <MonitoringQueryRows />
      </Suspense>
    </MonitoringQueryPageContent>
  );
}
