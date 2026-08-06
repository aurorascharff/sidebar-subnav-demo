export type RouteTemplate =
  | '/[teamSlug]'
  | '/[teamSlug]/~/deployments'
  | '/[teamSlug]/~/monitoring'
  | '/[teamSlug]/~/monitoring/query'
  | '/[teamSlug]/~/monitoring/alerts'
  | '/[teamSlug]/~/api'
  | '/[teamSlug]/~/api/quick-start'
  | '/[teamSlug]/~/api/keys'
  | '/[teamSlug]/~/api/providers'
  | '/[teamSlug]/~/api/settings'
  | '/[teamSlug]/~/settings';

export type NestedSidebarKey = 'team-monitoring' | 'team-api';
export type IconName = 'grid' | 'pulse' | 'key' | 'lines';

export interface RouteDefinition {
  action: string;
  description: string;
  label: string;
  section?: NestedSidebarKey;
}

export interface NavLinkDefinition {
  icon: IconName;
  nestedKey?: NestedSidebarKey;
  route: RouteTemplate;
}

export interface NavHeadingDefinition {
  heading: string;
}

export type TopLevelNavItem = NavLinkDefinition | NavHeadingDefinition;

export interface SidebarState {
  nestedKey?: NestedSidebarKey;
  pathname: string;
  route: RouteTemplate;
}

export const routeDefinitions: Record<RouteTemplate, RouteDefinition> = {
  '/[teamSlug]': {
    action: 'New Project',
    description: 'Browse and manage everything deployed by this team.',
    label: 'Projects',
  },
  '/[teamSlug]/~/deployments': {
    action: 'New Deployment',
    description: 'Inspect recent production and preview deployments.',
    label: 'Deployments',
  },
  '/[teamSlug]/~/monitoring': {
    action: 'Query Logs',
    description: 'Understand application health across requests, functions, and traces.',
    label: 'Monitoring',
    section: 'team-monitoring',
  },
  '/[teamSlug]/~/monitoring/query': {
    action: 'Run Query',
    description: 'Search logs, traces, and metrics with shared dashboard filters.',
    label: 'Query',
    section: 'team-monitoring',
  },
  '/[teamSlug]/~/monitoring/alerts': {
    action: 'Create Alert',
    description: 'Configure alerts for errors, latency, traffic, and spend.',
    label: 'Alerts',
    section: 'team-monitoring',
  },
  '/[teamSlug]/~/api': {
    action: 'Get API Key',
    description: 'Route model calls through one endpoint with unified usage and controls.',
    label: 'API',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/quick-start': {
    action: 'Copy Snippet',
    description: 'Connect an SDK and send your first request.',
    label: 'Quick Start',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/keys': {
    action: 'Create Key',
    description: 'Create and manage request keys.',
    label: 'Keys',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/providers': {
    action: 'Add Provider Key',
    description: 'Attach provider keys while keeping routing centralized.',
    label: 'Providers',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/settings': {
    action: 'Save Changes',
    description: 'Configure routing behavior, retention, and team defaults.',
    label: 'Settings',
    section: 'team-api',
  },
  '/[teamSlug]/~/settings': {
    action: 'Invite Member',
    description: 'Manage team members, billing, security, and platform preferences.',
    label: 'Settings',
  },
};

export const topLevelLinks: TopLevelNavItem[] = [
  { icon: 'grid', route: '/[teamSlug]' },
  { icon: 'lines', route: '/[teamSlug]/~/deployments' },
  {
    icon: 'pulse',
    nestedKey: 'team-monitoring',
    route: '/[teamSlug]/~/monitoring',
  },
  { heading: 'Setup' },
  {
    icon: 'pulse',
    nestedKey: 'team-api',
    route: '/[teamSlug]/~/api',
  },
  { icon: 'grid', route: '/[teamSlug]/~/settings' },
];

export const sidebarSections: Record<
  NestedSidebarKey,
  { links: NavLinkDefinition[]; title: string }
> = {
  'team-api': {
    links: [
      { icon: 'pulse', route: '/[teamSlug]/~/api' },
      { icon: 'lines', route: '/[teamSlug]/~/api/quick-start' },
      { icon: 'key', route: '/[teamSlug]/~/api/keys' },
      { icon: 'key', route: '/[teamSlug]/~/api/providers' },
      { icon: 'grid', route: '/[teamSlug]/~/api/settings' },
    ],
    title: 'API',
  },
  'team-monitoring': {
    links: [
      { icon: 'pulse', route: '/[teamSlug]/~/monitoring' },
      { icon: 'lines', route: '/[teamSlug]/~/monitoring/query' },
      { icon: 'grid', route: '/[teamSlug]/~/monitoring/alerts' },
    ],
    title: 'Monitoring',
  },
};

export function routeToPath(route: RouteTemplate, teamSlug: string): string {
  return route.replace('/[teamSlug]', `/${teamSlug}`);
}

export function pathToRoute(pathname: string, teamSlug: string): RouteTemplate {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
  const route = normalized.replace(`/${teamSlug}`, '/[teamSlug]');
  return route in routeDefinitions ? (route as RouteTemplate) : '/[teamSlug]';
}

export function getRouteSection(route: RouteTemplate): NestedSidebarKey | undefined {
  return routeDefinitions[route].section;
}

export function getSidebarStateForPath(pathname: string, teamSlug: string): SidebarState {
  const route = pathToRoute(pathname, teamSlug);
  const nestedKey = getRouteSection(route);

  return {
    nestedKey,
    pathname,
    route,
  };
}
