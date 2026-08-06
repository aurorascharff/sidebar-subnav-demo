import { getCurrentUser } from '@/features/account/account-queries';
import { getSidebarStateForPath } from '../navigation-model';
import { Sidebar } from './sidebar';

export async function DashboardSidebar({ teamSlug }: { teamSlug: string }) {
  const user = await getCurrentUser();
  const initialState = getSidebarStateForPath(`/${teamSlug}`, teamSlug);
  return <Sidebar initialState={initialState} teamSlug={teamSlug} user={user} />;
}

export function DashboardSidebarSkeleton() {
  return (
    <aside className="dashboard-sidebar" aria-hidden>
      <div className="team-switcher">
        <span className="avatar" />
        <span className="skeleton sidebar-skeleton-label" />
      </div>
      <div className="skeleton sidebar-skeleton-search" />
      <div className="nav-window">
        <div className="pane">
          {Array.from({ length: 6 }, (_, index) => (
            <div className="skeleton sidebar-skeleton-link" key={index} />
          ))}
        </div>
      </div>
    </aside>
  );
}
