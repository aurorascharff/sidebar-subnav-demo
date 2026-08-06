import Link from 'next/link';
import { Suspense } from 'react';
import { getCurrentUser } from '@/features/account/account-queries';
import { NavLinkScript } from './nav-link-script';
import { SidebarNavigation } from './sidebar';

export function DashboardSidebar({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  return (
    <aside className="dashboard-sidebar">
      <Suspense fallback={<TeamSwitcherSkeleton />}>
        {params.then(({ teamSlug }) => (
          <TeamSwitcher teamSlug={teamSlug} />
        ))}
      </Suspense>

      <div className="find">Find...</div>

      <Suspense fallback={<SidebarNavigationSkeleton />}>
        {params.then(({ teamSlug }) => (
          <>
            <SidebarNavigation teamSlug={teamSlug} />
            <NavLinkScript />
          </>
        ))}
      </Suspense>

      <Suspense fallback={<SidebarUserSkeleton />}>
        <SidebarUser />
      </Suspense>
    </aside>
  );
}

async function TeamSwitcher({ teamSlug }: { teamSlug: string }) {
  const user = await getCurrentUser();

  return (
    <Link className="team-switcher" href={`/${teamSlug}`}>
      <span className="avatar" />
      <span className="team-copy">
        <span className="label">{teamSlug}</span>
        <span className="meta">{user.role}</span>
      </span>
    </Link>
  );
}

async function SidebarUser() {
  const user = await getCurrentUser();

  return (
    <div className="user-card">
      <span className="user-avatar">{user.name.slice(0, 1)}</span>
      <span className="team-copy">
        <span className="label">{user.name}</span>
        <span className="meta">{user.email}</span>
      </span>
    </div>
  );
}

function TeamSwitcherSkeleton() {
  return (
    <div className="team-switcher" aria-hidden>
      <span className="avatar" />
      <span className="skeleton sidebar-skeleton-label" />
    </div>
  );
}

function SidebarNavigationSkeleton() {
  return (
    <nav className="nav-window" aria-label="Dashboard" aria-busy="true">
      <div className="pane" aria-hidden>
        {Array.from({ length: 6 }, (_, index) => (
          <div className="skeleton sidebar-skeleton-link" key={index} />
        ))}
      </div>
    </nav>
  );
}

function SidebarUserSkeleton() {
  return (
    <div className="user-card" aria-hidden>
      <span className="skeleton user-avatar" />
      <span className="skeleton sidebar-skeleton-user" />
    </div>
  );
}
