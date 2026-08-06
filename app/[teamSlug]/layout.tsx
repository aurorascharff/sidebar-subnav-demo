import { Suspense } from 'react';
import {
  SidebarSkeleton,
  SidebarSlot,
} from '@/features/navigation/components/sidebar-slot';

export default function TeamLayout({
  children,
  params,
}: LayoutProps<"/[teamSlug]">) {
  return (
    <div className="app-shell">
      <Suspense fallback={<SidebarSkeleton />}>
        {params.then(({ teamSlug }) => (
          <SidebarSlot teamSlug={teamSlug} />
        ))}
      </Suspense>
      <main className="main-content">{children}</main>
    </div>
  );
}
