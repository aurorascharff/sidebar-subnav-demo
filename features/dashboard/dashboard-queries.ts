import 'server-only';

export interface DashboardRow {
  detail: string;
  name: string;
  status: string;
}

export async function getProjectRows(teamSlug: string): Promise<DashboardRow[]> {
  'use cache';

  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { detail: 'Production', name: `${teamSlug}-web`, status: 'Ready' },
    { detail: 'Preview', name: `${teamSlug}-api`, status: 'Ready' },
    { detail: 'Development', name: `${teamSlug}-docs`, status: 'Building' },
  ];
}

export async function getDeploymentRows(teamSlug: string): Promise<DashboardRow[]> {
  'use cache';

  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { detail: 'Production', name: `${teamSlug}-web`, status: 'Ready' },
    { detail: 'Preview', name: `${teamSlug}-api`, status: 'Promoted' },
    { detail: 'Preview', name: `${teamSlug}-docs`, status: 'Queued' },
  ];
}

export async function getApiKeyRows(teamSlug: string): Promise<DashboardRow[]> {
  'use cache';

  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { detail: 'Production', name: `${teamSlug}-server`, status: 'Active' },
    { detail: 'Preview', name: `${teamSlug}-preview`, status: 'Active' },
    { detail: 'Local', name: `${teamSlug}-dev`, status: 'Restricted' },
  ];
}

export async function getMonitoringRows(teamSlug: string): Promise<DashboardRow[]> {
  'use cache';

  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    { detail: 'Requests', name: `${teamSlug}-web`, status: 'Healthy' },
    { detail: 'Functions', name: `${teamSlug}-api`, status: 'Healthy' },
    { detail: 'Cron', name: `${teamSlug}-jobs`, status: 'Warning' },
  ];
}
