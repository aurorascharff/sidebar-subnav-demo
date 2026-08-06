import { Suspense } from 'react';
import {
  PageSkeleton,
  ProjectsOverview,
} from '@/features/dashboard/components/dashboard-pages';

export default function TeamPage({ params }: PageProps<'/[teamSlug]'>) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      {params.then(({ teamSlug }) => (
        <ProjectsOverview teamSlug={teamSlug} />
      ))}
    </Suspense>
  );
}
