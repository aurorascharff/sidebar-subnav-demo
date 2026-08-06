import {
  routeDefinitions,
  sidebarSections,
  topLevelLinks,
  type IconName,
  type RouteTemplate,
} from '@/features/navigation/navigation-model';

export function SidebarNavigationSkeleton() {
  return (
    <nav className="nav-window" aria-label="Dashboard" aria-busy="true">
      <div className="pane sidebar-pane-skeleton" aria-hidden>
        <div className="skeleton sidebar-skeleton-back" />
        {Array.from({ length: 5 }, (_, index) => (
          <div className="sidebar-skeleton-row" key={index}>
            <span className="skeleton sidebar-skeleton-icon" />
            <span className="skeleton sidebar-skeleton-text" />
          </div>
        ))}
      </div>
    </nav>
  );
}

export function InlineSidebarNavigationFallback() {
  return (
    <>
      <nav className="nav-window" aria-label="Dashboard" aria-busy="true">
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

function applyInlineSidebarFallback(nav: HTMLElement | null) {
  if (!nav) return;

  const route = location.pathname.replace(/^\/[^/]+/, '/[teamSlug]');
  const section = route.startsWith('/[teamSlug]/~/api')
    ? 'team-api'
    : route.startsWith('/[teamSlug]/~/monitoring')
      ? 'team-monitoring'
      : 'main';

  nav
    .querySelector<HTMLElement>(`[data-sidebar-pane="${section}"]`)
    ?.classList.remove('pane-nested-hidden');

  nav.querySelectorAll<HTMLElement>('[data-sidebar-route]').forEach((link) => {
    const target = link.dataset.sidebarRoute || '';
    const exact = link.hasAttribute('data-sidebar-exact');
    const active = exact
      ? route === target
      : route === target || route.startsWith(`${target}/`);

    if (active) link.setAttribute('aria-current', 'page');
  });
}
