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
    <>
      <nav
        className="nav-window"
        aria-label="Dashboard"
        aria-busy="true"
        data-sidebar-fallback
      >
        <SidebarPaneSkeleton />
        <div className="pane pane-nested-hidden" data-sidebar-pane="main">
          {topLevelLinks.map((item) => {
            if ('heading' in item) {
              return <div className="heading" key={item.heading}>{item.heading}</div>;
            }

            return (
              <FallbackNavLink
                icon={item.icon}
                key={item.route}
                label={routeDefinitions[item.route].label}
                route={item.route}
                showChevron={Boolean(item.nestedKey)}
              />
            );
          })}
        </div>

        {Object.entries(sidebarSections).map(([key, section]) => (
          <div
            className="pane pane-nested-hidden"
            data-sidebar-pane={key}
            key={key}
          >
            <div className="nav-link back">{section.title}</div>
            {section.links.map((link) => (
              <FallbackNavLink
                icon={link.icon}
                key={link.route}
                label={routeDefinitions[link.route].label}
                route={link.route}
              />
            ))}
          </div>
        ))}
      </nav>
      <script
        dangerouslySetInnerHTML={{
          __html: `(${applyInlineSidebarFallback.toString()})(document.currentScript.previousElementSibling)`,
        }}
        suppressHydrationWarning
        type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      />
    </>
  );
}

function FallbackNavLink({
  icon,
  label,
  route,
  showChevron,
}: {
  icon: IconName;
  label: string;
  route: RouteTemplate;
  showChevron?: boolean;
}) {
  return (
    <div
      className="nav-link"
      data-sidebar-exact={!showChevron || undefined}
      data-sidebar-route={route}
    >
      <span className={`icon icon-${icon}`} />
      <span className="label">{label}</span>
      {showChevron ? <span className="chevron" /> : null}
    </div>
  );
}

function SidebarPaneSkeleton() {
  return (
    <div className="pane sidebar-pane-skeleton" data-sidebar-skeleton aria-hidden>
      <div className="skeleton sidebar-skeleton-back" />
      {Array.from({ length: 5 }, (_, index) => (
        <div className="sidebar-skeleton-row" key={index}>
          <span className="skeleton sidebar-skeleton-icon" />
          <span className="skeleton sidebar-skeleton-text" />
        </div>
      ))}
    </div>
  );
}

function applyInlineSidebarFallback(nav: HTMLElement | null) {
  if (!nav || new URLSearchParams(location.search).get('sidebar') !== 'inline') {
    return;
  }

  const route = location.pathname.replace(/^\/[^/]+/, '/[teamSlug]');
  const section = route.startsWith('/[teamSlug]/~/api')
    ? 'team-api'
    : route.startsWith('/[teamSlug]/~/monitoring')
      ? 'team-monitoring'
      : 'main';

  nav.querySelector<HTMLElement>('[data-sidebar-skeleton]')?.classList.add('pane-main-hidden');
  nav.querySelector<HTMLElement>(`[data-sidebar-pane="${section}"]`)?.classList.remove('pane-nested-hidden');

  nav.querySelectorAll<HTMLElement>('[data-sidebar-route]').forEach((link) => {
    const target = link.dataset.sidebarRoute || '';
    const exact = link.hasAttribute('data-sidebar-exact');
    const active = exact
      ? route === target
      : route === target || route.startsWith(`${target}/`);

    if (active) link.setAttribute('aria-current', 'page');
  });
}

export function SidebarModeSwitch() {
  const [mode, setMode] = useState<'fallback' | 'inline'>('fallback');

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('sidebar');
    setMode(value === 'inline' ? 'inline' : 'fallback');
  }, []);

  function selectMode(nextMode: 'fallback' | 'inline') {
    const url = new URL(window.location.href);
    if (nextMode === 'inline') url.searchParams.set('sidebar', 'inline');
    else url.searchParams.delete('sidebar');
    window.location.assign(url);
  }

  return (
    <div className="sidebar-mode-switch" role="group" aria-label="Sidebar fallback">
      <button
        aria-pressed={mode === 'fallback'}
        onClick={() => selectMode('fallback')}
        type="button"
      >
        Fallback
      </button>
      <button
        aria-pressed={mode === 'inline'}
        onClick={() => selectMode('inline')}
        type="button"
      >
        Inline
      </button>
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
