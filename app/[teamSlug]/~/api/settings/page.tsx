import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function ApiSettingsPage({
  params,
}: PageProps<'/[teamSlug]/~/api/settings'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/api/settings" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
