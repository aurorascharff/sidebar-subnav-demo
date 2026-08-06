import { Suspense } from 'react';
import {
  ApiProvidersPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiProvidersPage({
  params,
}: PageProps<'/[teamSlug]/~/api/providers'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <ApiProvidersPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
