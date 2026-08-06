import { Suspense } from 'react';
import {
  MonitoringPageContent,
  MonitoringRows,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function MonitoringPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <MonitoringPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <MonitoringRows teamSlug={teamSlug} />
      </Suspense>
    </MonitoringPageContent>
  );
}
