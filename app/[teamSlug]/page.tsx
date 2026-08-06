import { Suspense } from 'react';
import {
  ProjectRows,
  ProjectsOverview,
  RowsSkeleton,
} from '@/features/dashboard/components/dashboard-pages';

export default function TeamPage({ params }: PageProps<'/[teamSlug]'>) {
  const teamSlug = params.then((value) => value.teamSlug);

  return (
    <ProjectsOverview teamSlug={teamSlug}>
      <Suspense fallback={<RowsSkeleton />}>
        <ProjectRows teamSlug={teamSlug} />
      </Suspense>
    </ProjectsOverview>
  );
}
