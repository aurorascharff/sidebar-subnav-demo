import { Suspense } from 'react';
import {
  ApiSettingsPageContent,
  ApiSettingsRows,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiSettingsPage({
  params,
}: PageProps<'/[teamSlug]/~/api/settings'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <ApiSettingsPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <ApiSettingsRows />
      </Suspense>
    </ApiSettingsPageContent>
  );
}
