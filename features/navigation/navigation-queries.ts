import 'server-only';
import { getSidebarStateForPath, type SidebarState } from './navigation-model';

export interface SidebarShell {
  initialState: SidebarState;
  teamSlug: string;
}

export async function getSidebarShell(
  teamSlug: string,
  segments: string[] = [],
): Promise<SidebarShell> {
  'use cache';

  await new Promise((resolve) => setTimeout(resolve, 30));

  const pathname = `/${[teamSlug, ...segments].join('/')}`;
  return {
    initialState: getSidebarStateForPath(pathname, teamSlug),
    teamSlug,
  };
}
