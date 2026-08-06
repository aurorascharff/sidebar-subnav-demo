import { Suspense } from 'react';
import {
  ApiKeyRows,
  ApiKeysPageContent,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiKeysPage({
  params,
}: PageProps<'/[teamSlug]/~/api/keys'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <ApiKeysPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <ApiKeyRows teamSlug={teamSlug} />
      </Suspense>
    </ApiKeysPageContent>
  );
}
