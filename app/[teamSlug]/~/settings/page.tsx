import { Suspense } from 'react';
import {
  RowsSkeleton,
  SettingsPageContent,
  SettingsRows,
} from '@/features/dashboard/components/dashboard-pages';

export default function SettingsPage({
  params,
}: PageProps<'/[teamSlug]/~/settings'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <SettingsPageContent teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <SettingsRows />
      </Suspense>
    </SettingsPageContent>
  );
}
