'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getRouteSection,
  pathToRoute,
  routeDefinitions,
  routeToPath,
  sidebarSections,
  topLevelLinks,
  type IconName,
  type RouteTemplate,
} from '@/features/navigation/navigation-model';

export function SidebarNavigation({ teamSlug }: { teamSlug: string }) {
  const pathname = usePathname();
  const currentRoute = pathToRoute(pathname, teamSlug);
  const currentNestedKey = getRouteSection(currentRoute);
  const [showNested, setShowNested] = useState(Boolean(currentNestedKey));
  const nestedLinks = currentNestedKey
    ? sidebarSections[currentNestedKey]
    : undefined;

  useEffect(() => {
    setShowNested(Boolean(currentNestedKey));
  }, [currentNestedKey, pathname]);

  return (
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
              showChevron={Boolean(item.nestedKey)}
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
  );
}

export function SidebarNavigationFallback() {
  return (
    <nav className="nav-window" aria-label="Dashboard" aria-busy="true">
      <div className="pane" aria-hidden>
        {topLevelLinks.map((item) => {
          if ('heading' in item) {
            return <div className="heading" key={item.heading}>{item.heading}</div>;
          }

          return (
            <FallbackNavLink
              icon={item.icon}
              key={item.route}
              label={routeDefinitions[item.route].label}
              showChevron={Boolean(item.nestedKey)}
            />
          );
        })}
      </div>
    </nav>
  );
}

function FallbackNavLink({
  icon,
  label,
  showChevron,
}: {
  icon: IconName;
  label: string;
  showChevron?: boolean;
}) {
  return (
    <div className="nav-link">
      <span className={`icon icon-${icon}`} />
      <span className="label">{label}</span>
      {showChevron ? <span className="chevron" /> : null}
    </div>
  );
}

function NavLink({
  active,
  href,
  icon,
  label,
  showChevron,
}: {
  active: boolean;
  href: string;
  icon: IconName;
  label: string;
  showChevron?: boolean;
}) {
  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={`nav-link ${active ? 'nav-link-active' : ''}`}
      data-navlink-exact={!showChevron || undefined}
      data-navlink-href={href}
      href={href as RouteTemplate}
      suppressHydrationWarning
    >
      <span className={`icon icon-${icon}`} />
      <span className="label">{label}</span>
      {showChevron ? <span className="chevron" /> : null}
    </Link>
  );
}
