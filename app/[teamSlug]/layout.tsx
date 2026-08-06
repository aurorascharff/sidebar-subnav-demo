import { Suspense } from 'react';
import {
  DashboardSidebar,
  DashboardSidebarSkeleton,
} from '@/features/navigation/components/dashboard-sidebar';

export default function TeamLayout({
  children,
  params,
}: LayoutProps<"/[teamSlug]">) {
  return (
    <div className="app-shell">
      <Suspense fallback={<DashboardSidebarSkeleton />}>
        {params.then(({ teamSlug }) => (
          <DashboardSidebar teamSlug={teamSlug} />
        ))}
      </Suspense>
      <main className="main-content">{children}</main>
    </div>
  );
}
