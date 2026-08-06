import 'server-only';
import { cookies } from 'next/headers';

export interface DashboardRow {
  detail: string;
  name: string;
  status: string;
}

async function getRequestScopedRows(rows: DashboardRow[]): Promise<DashboardRow[]> {
  await cookies();
  await new Promise((resolve) => setTimeout(resolve, 300));
  return rows;
}

export async function getProjectRows(teamSlug: string): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Production', name: `${teamSlug}-web`, status: 'Ready' },
    { detail: 'Preview', name: `${teamSlug}-api`, status: 'Ready' },
    { detail: 'Development', name: `${teamSlug}-docs`, status: 'Building' },
  ]);
}

export async function getDeploymentRows(teamSlug: string): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Production', name: `${teamSlug}-web`, status: 'Ready' },
    { detail: 'Preview', name: `${teamSlug}-api`, status: 'Promoted' },
    { detail: 'Preview', name: `${teamSlug}-docs`, status: 'Queued' },
  ]);
}

export async function getApiSetupRows(): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Guide', name: 'Quick Start', status: 'Ready' },
    { detail: 'Credentials', name: 'Keys', status: 'Active' },
    { detail: 'Routing', name: 'Providers', status: 'Configured' },
  ]);
}

export async function getApiQuickStartRows(): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Environment', name: 'Add API_KEY', status: 'Required' },
    { detail: 'SDK', name: 'Install client', status: 'Ready' },
    { detail: 'Request', name: 'Send test call', status: 'Next' },
  ]);
}

export async function getApiKeyRows(teamSlug: string): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Production', name: `${teamSlug}-server`, status: 'Active' },
    { detail: 'Preview', name: `${teamSlug}-preview`, status: 'Active' },
    { detail: 'Local', name: `${teamSlug}-dev`, status: 'Restricted' },
  ]);
}

export async function getApiProviderRows(): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Primary', name: 'Provider A', status: 'Healthy' },
    { detail: 'Fallback', name: 'Provider B', status: 'Healthy' },
    { detail: 'Embeddings', name: 'Provider C', status: 'Healthy' },
  ]);
}

export async function getApiSettingsRows(): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Traffic', name: 'Retry failed requests', status: 'Enabled' },
    { detail: 'Usage', name: 'Store request metadata', status: 'Enabled' },
    { detail: 'Spend', name: 'Monthly budget alert', status: 'Enabled' },
  ]);
}

export async function getMonitoringRows(teamSlug: string): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Requests', name: `${teamSlug}-web`, status: 'Healthy' },
    { detail: 'Functions', name: `${teamSlug}-api`, status: 'Healthy' },
    { detail: 'Cron', name: `${teamSlug}-jobs`, status: 'Warning' },
  ]);
}

export async function getMonitoringQueryRows(): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'error:false', name: 'status:200', status: '481 hits' },
    { detail: 'region:iad', name: 'duration:<100', status: '312 hits' },
    { detail: 'path:/api/*', name: 'method:POST', status: '89 hits' },
  ]);
}

export async function getMonitoringAlertRows(): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Error rate', name: 'Production errors', status: 'Active' },
    { detail: 'Latency', name: 'P95 over 500ms', status: 'Active' },
    { detail: 'Spend', name: 'Monthly budget', status: 'Active' },
  ]);
}

export async function getSettingsRows(): Promise<DashboardRow[]> {
  return getRequestScopedRows([
    { detail: 'Access', name: 'Members and roles', status: 'Configured' },
    { detail: 'Billing', name: 'Plan and invoices', status: 'Current' },
    { detail: 'Security', name: 'Authentication', status: 'Enforced' },
  ]);
}
