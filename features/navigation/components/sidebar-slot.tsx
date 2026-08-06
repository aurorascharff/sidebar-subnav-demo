import { Sidebar } from './sidebar';
import { getSidebarShell } from '../navigation-queries';

export async function SidebarSlot({
  segments,
  teamSlug,
}: {
  segments?: string[];
  teamSlug: string;
}) {
  const { initialState } = await getSidebarShell(teamSlug, segments);
  return <Sidebar initialState={initialState} teamSlug={teamSlug} />;
}

export function SidebarSkeleton() {
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
