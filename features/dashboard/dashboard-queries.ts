import 'server-only';

export interface DashboardRow {
  detail: string;
  name: string;
  status: string;
}

export async function getRows(teamSlug: string): Promise<DashboardRow[]> {
  'use cache';

  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { detail: 'Production', name: `${teamSlug}-web`, status: 'Ready' },
    { detail: 'Preview', name: `${teamSlug}-api`, status: 'Ready' },
    { detail: 'Development', name: `${teamSlug}-docs`, status: 'Building' },
  ];
}
