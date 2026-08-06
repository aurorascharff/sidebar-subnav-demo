import { Suspense } from 'react';
import {
  ApiQuickStartPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiQuickStartPage({
  params,
}: PageProps<'/[teamSlug]/~/api/quick-start'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <ApiQuickStartPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
