import { Suspense } from 'react';
import {
  DeploymentsPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function DeploymentsPage({
  params,
}: PageProps<'/[teamSlug]/~/deployments'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <DeploymentsPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
