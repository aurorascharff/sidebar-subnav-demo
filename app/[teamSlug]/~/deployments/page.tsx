import { Suspense } from 'react';
import {
  PageSurface,
  PageSurfaceSkeleton,
} from '@/features/dashboard/components/page-surface';

export default function DeploymentsPage({
  params,
}: PageProps<'/[teamSlug]/~/deployments'>) {
  return (
    <Suspense fallback={<PageSurfaceSkeleton />}>
      {params.then(({ teamSlug }) => (
        <PageSurface route="/[teamSlug]/~/deployments" teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
