import { Suspense } from 'react';
import {
  MonitoringQueryPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function MonitoringQueryPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring/query'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <MonitoringQueryPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
