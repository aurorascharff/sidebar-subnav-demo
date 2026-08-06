import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function SettingsPage({
  params,
}: PageProps<'/[teamSlug]/~/settings'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/settings" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
