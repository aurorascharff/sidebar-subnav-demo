import { Suspense } from 'react';
import {
  ApiProviderRows,
  ApiProvidersPageContent,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiProvidersPage({
  params,
}: PageProps<'/[teamSlug]/~/api/providers'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <ApiProvidersPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <ApiProviderRows />
      </Suspense>
    </ApiProvidersPageContent>
  );
}
