import { getSidebarStateForPath } from '../navigation-model';
import { Sidebar } from './sidebar';

export function DashboardSidebar({ teamSlug }: { teamSlug: string }) {
  const initialState = getSidebarStateForPath(`/${teamSlug}`, teamSlug);
  return <Sidebar initialState={initialState} teamSlug={teamSlug} />;
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
