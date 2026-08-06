import { Suspense } from 'react';
import {
  PageSkeleton,
  SettingsPageContent,
} from '@/features/dashboard/components/dashboard-pages';

export default function SettingsPage({
  params,
}: PageProps<'/[teamSlug]/~/settings'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <SettingsPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
