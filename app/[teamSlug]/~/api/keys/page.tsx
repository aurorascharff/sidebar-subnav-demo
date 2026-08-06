import { Suspense } from 'react';
import {
  ApiKeysPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiKeysPage({
  params,
}: PageProps<'/[teamSlug]/~/api/keys'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <ApiKeysPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
