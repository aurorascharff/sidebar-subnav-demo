import { Suspense } from 'react';
import {
  DeploymentRows,
  DeploymentsPageContent,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function DeploymentsPage({
  params,
}: PageProps<'/[teamSlug]/~/deployments'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <DeploymentsPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <DeploymentRows teamSlug={teamSlug} />
      </Suspense>
    </DeploymentsPageContent>
  );
}
