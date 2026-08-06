'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    applySidebarFallback(navRef.current);
  }, []);

  return (
    <>
      <nav
        className="nav-window"
        aria-label="Dashboard"
        data-sidebar-fallback
        ref={navRef}
      >
        <div className="pane" data-sidebar-pane="main">
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
          __html: `(${applySidebarFallback.toString()})(document.currentScript.previousElementSibling)`,
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
    <a
      className="nav-link"
      data-navlink-exact={!showChevron || undefined}
      data-navlink-route={route}
      href="#"
      suppressHydrationWarning
    >
      <span className={`icon icon-${icon}`} />
      <span className="label">{label}</span>
      {showChevron ? <span className="chevron" /> : null}
    </a>
  );
}

function applySidebarFallback(nav: HTMLElement | null) {
  if (!nav) return;

  const pathname = window.location.pathname;
  const route = pathname.replace(/^\/[^/]+/, '/[teamSlug]');
  const section = route.startsWith('/[teamSlug]/~/api')
    ? 'team-api'
    : route.startsWith('/[teamSlug]/~/monitoring')
      ? 'team-monitoring'
      : 'main';

  nav.querySelectorAll<HTMLElement>('[data-sidebar-pane]').forEach((pane) => {
    const key = pane.dataset.sidebarPane;
    pane.classList.toggle('pane-main-hidden', key === 'main' && section !== 'main');
    pane.classList.toggle('pane-nested-hidden', key !== 'main' && key !== section);
  });

  const teamSlug = pathname.split('/')[1] || '';
  nav.querySelectorAll<HTMLAnchorElement>('[data-navlink-route]').forEach((link) => {
    const template = link.dataset.navlinkRoute || '';
    const href = template.replace('/[teamSlug]', `/${teamSlug}`);
    const exact = link.hasAttribute('data-navlink-exact');
    const active = exact
      ? route === template
      : route === template || route.startsWith(`${template}/`);

    link.setAttribute('href', href);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
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
