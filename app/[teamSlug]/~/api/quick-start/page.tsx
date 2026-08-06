import { Suspense } from 'react';
import {
  ApiQuickStartPageContent,
  ApiQuickStartRows,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiQuickStartPage({
  params,
}: PageProps<'/[teamSlug]/~/api/quick-start'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <ApiQuickStartPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <ApiQuickStartRows />
      </Suspense>
    </ApiQuickStartPageContent>
  );
}
