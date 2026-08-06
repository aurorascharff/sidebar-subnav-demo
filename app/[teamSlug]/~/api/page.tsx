import { Suspense } from 'react';
import {
  ApiOverviewPageContent,
  ApiSetupRows,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiPage({
  params,
}: PageProps<'/[teamSlug]/~/api'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <ApiOverviewPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <ApiSetupRows />
      </Suspense>
    </ApiOverviewPageContent>
  );
}
