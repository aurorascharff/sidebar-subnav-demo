'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  computeNestedSidebar,
  nestedLinkDefinitions,
  pathToRoute,
  routeDefinitions,
  routeToPath,
  topLevelLinks,
  type IconName,
  type NestedSidebarKey,
  type RouteTemplate,
  type SidebarState,
} from '@/features/navigation/navigation-model';

export function Sidebar({
  initialState,
  teamSlug,
}: {
  initialState: SidebarState;
  teamSlug: string;
}) {
  const pathname = usePathname() || initialState.pathname;
  const currentRoute = pathToRoute(pathname, teamSlug);
  const currentNestedKey = computeNestedSidebar(currentRoute);
  const [optimisticNestedKey, setOptimisticNestedKey] =
    useState<NestedSidebarKey>();
  const [showNested, setShowNested] = useState(initialState.showNested);
  const nestedKey = optimisticNestedKey ?? currentNestedKey ?? initialState.nestedKey;
  const nestedLinks = nestedKey ? nestedLinkDefinitions[nestedKey] : undefined;

  useEffect(() => {
    setOptimisticNestedKey(undefined);
    setShowNested(Boolean(currentNestedKey));
  }, [currentNestedKey, pathname]);

  return (
    <aside className="dashboard-sidebar">
      <Link className="team-switcher" href={`/${teamSlug}`} prefetch={true}>
        <span className="avatar" />
        <span className="label">{teamSlug}</span>
      </Link>

      <div className="find">Find...</div>

      <nav className="nav-window" aria-label="Dashboard">
        <div className={`pane ${showNested ? 'pane-main-hidden' : ''}`}>
          {topLevelLinks.map((item) => {
            if ('heading' in item) {
              return <div className="heading" key={item.heading}>{item.heading}</div>;
            }

            const isActive = item.nestedKey
              ? currentNestedKey === item.nestedKey
              : currentRoute === item.route;

            return (
              <NavLink
                active={isActive}
                href={routeToPath(item.route, teamSlug)}
                icon={item.icon}
                key={item.route}
                label={routeDefinitions[item.route].label}
                nestedKey={item.nestedKey}
                onNestedClick={(key) => {
                  setOptimisticNestedKey(key);
                  setShowNested(true);
                }}
              />
            );
          })}
        </div>

        <div className={`pane ${showNested ? '' : 'pane-nested-hidden'}`}>
          {nestedLinks ? (
            <>
              <button
                className="nav-link nav-button back"
                onClick={() => setShowNested(false)}
                type="button"
              >
                {nestedLinks.title}
              </button>
              {nestedLinks.links.map((link) => (
                <NavLink
                  active={currentRoute === link.route}
                  href={routeToPath(link.route, teamSlug)}
                  icon={link.icon}
                  key={link.route}
                  label={routeDefinitions[link.route].label}
                />
              ))}
            </>
          ) : null}
        </div>
      </nav>
    </aside>
  );
}

function NavLink({
  active,
  href,
  icon,
  label,
  nestedKey,
  onNestedClick,
}: {
  active: boolean;
  href: string;
  icon: IconName;
  label: string;
  nestedKey?: NestedSidebarKey;
  onNestedClick?: (key: NestedSidebarKey) => void;
}) {
  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`nav-link ${active ? 'nav-link-active' : ''}`}
      data-navlink-exact={!nestedKey || undefined}
      data-navlink-href={href}
      href={href as RouteTemplate}
      onClick={() => {
        if (nestedKey) {
          onNestedClick?.(nestedKey);
        }
      }}
      prefetch={true}
      suppressHydrationWarning
    >
      <span className={`icon icon-${icon}`} />
      <span className="label">{label}</span>
      {nestedKey ? <span className="chevron" /> : null}
    </Link>
  );
}
