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

export const routeDefinitions: Record<RouteTemplate, RouteDefinition> = {
  '/[teamSlug]': {
    label: 'Projects',
  },
  '/[teamSlug]/~/deployments': {
    label: 'Deployments',
  },
  '/[teamSlug]/~/monitoring': {
    label: 'Monitoring',
    section: 'team-monitoring',
  },
  '/[teamSlug]/~/monitoring/query': {
    label: 'Query',
    section: 'team-monitoring',
  },
  '/[teamSlug]/~/monitoring/alerts': {
    label: 'Alerts',
    section: 'team-monitoring',
  },
  '/[teamSlug]/~/api': {
    label: 'API',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/quick-start': {
    label: 'Quick Start',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/keys': {
    label: 'Keys',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/providers': {
    label: 'Providers',
    section: 'team-api',
  },
  '/[teamSlug]/~/api/settings': {
    label: 'Settings',
    section: 'team-api',
  },
  '/[teamSlug]/~/settings': {
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
