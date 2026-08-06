import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function ApiPage({
  params,
}: PageProps<'/[teamSlug]/~/api'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/api" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
