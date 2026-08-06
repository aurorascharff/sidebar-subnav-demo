import { Suspense } from 'react';
import {
  MonitoringPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function MonitoringPage({
  params,
}: PageProps<'/[teamSlug]/~/monitoring'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <MonitoringPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
