import { Suspense } from 'react';
import {
  ApiSettingsPageContent,
  PageSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function ApiSettingsPage({
  params,
}: PageProps<'/[teamSlug]/~/api/settings'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <ApiSettingsPageContent teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
