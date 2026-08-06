import { Suspense } from 'react';
import {
  ApiOverviewPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiPage({
  params,
}: PageProps<'/[teamSlug]/~/api'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <ApiOverviewPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
