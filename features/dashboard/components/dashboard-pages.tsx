import { Suspense } from 'react';
import {
  getApiProviderRows,
  getApiQuickStartRows,
  getApiSettingsRows,
  getApiSetupRows,
  getApiKeyRows,
  getDeploymentRows,
  getMonitoringAlertRows,
  getMonitoringQueryRows,
  getMonitoringRows,
  getProjectRows,
  getSettingsRows,
} from '../dashboard-queries';

interface Metric {
  label: string;
  value: string;
}

interface Row {
  detail: string;
  name: string;
  status: string;
}

function DashboardPage({
  action,
  area,
  children,
  description,
  metrics,
  teamSlug,
  title,
}: {
  action: string;
  area: string;
  children: React.ReactNode;
  description: string;
  metrics: Metric[];
  teamSlug: string;
  title: string;
}) {
  return (
    <>
      <div className="topbar">
        <div className="breadcrumbs">{teamSlug} / {area}</div>
      </div>
      <div className="page">
        <header className="page-header">
          <div>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <button className="primary" type="button">{action}</button>
        </header>
        <MetricGrid metrics={metrics} />
        {children}
      </div>
    </>
  );
}

export function PageSkeleton() {
  return (
    <>
      <div className="topbar">
        <div className="skeleton skeleton-line" />
      </div>
      <div className="page">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-line" />
        <MetricGrid
          metrics={[
            { label: 'Metric', value: '-' },
            { label: 'Metric', value: '-' },
            { label: 'Metric', value: '-' },
          ]}
        />
      </div>
    </>
  );
}

export function ProjectsOverview({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="New Project"
      area="Projects"
      description="Browse active projects, recent deployments, and the work currently moving through this team."
      metrics={[
        { label: 'Projects', value: '12' },
        { label: 'Deployments', value: '184' },
        { label: 'Ready', value: '98%' },
      ]}
      teamSlug={teamSlug}
      title="Projects"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <ProjectRows teamSlug={teamSlug} />
      </Suspense>
    </DashboardPage>
  );
}

export function DeploymentsPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="New Deployment"
      area="Deployments"
      description="Review recent production and preview deployments across this team."
      metrics={[
        { label: 'Production', value: '42' },
        { label: 'Preview', value: '141' },
        { label: 'Rollback', value: '1' },
      ]}
      teamSlug={teamSlug}
      title="Deployments"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <DeploymentRows teamSlug={teamSlug} />
      </Suspense>
    </DashboardPage>
  );
}

export function ApiOverviewPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Get API Key"
      area="API"
      description="Manage keys, providers, and routing behavior from one section."
      metrics={[
        { label: 'Requests', value: '2.4M' },
        { label: 'Providers', value: '3' },
        { label: 'Keys', value: '8' },
      ]}
      teamSlug={teamSlug}
      title="API"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <ApiSetupRows />
      </Suspense>
    </DashboardPage>
  );
}

export function ApiQuickStartPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Copy Snippet"
      area="API"
      description="Connect an SDK, set an environment variable, and send a test request."
      metrics={[
        { label: 'Step', value: '1' },
        { label: 'Runtime', value: 'Node' },
        { label: 'Status', value: 'Ready' },
      ]}
      teamSlug={teamSlug}
      title="Quick Start"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <ApiQuickStartRows />
      </Suspense>
    </DashboardPage>
  );
}

export function ApiKeysPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Create Key"
      area="API"
      description="Create, rotate, and revoke request keys for this team."
      metrics={[
        { label: 'Active', value: '8' },
        { label: 'Rotated', value: '2' },
        { label: 'Expired', value: '0' },
      ]}
      teamSlug={teamSlug}
      title="Keys"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <ApiKeyRows teamSlug={teamSlug} />
      </Suspense>
    </DashboardPage>
  );
}

export function ApiProvidersPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Add Provider"
      area="API"
      description="Attach provider credentials and choose routing defaults for requests."
      metrics={[
        { label: 'Configured', value: '3' },
        { label: 'Fallbacks', value: '2' },
        { label: 'Healthy', value: '100%' },
      ]}
      teamSlug={teamSlug}
      title="Providers"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <ApiProviderRows />
      </Suspense>
    </DashboardPage>
  );
}

export function ApiSettingsPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Save Changes"
      area="API"
      description="Configure routing behavior, retention, and team defaults."
      metrics={[
        { label: 'Retention', value: '30d' },
        { label: 'Retries', value: 'On' },
        { label: 'Budget', value: '$2K' },
      ]}
      teamSlug={teamSlug}
      title="Settings"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <ApiSettingsRows />
      </Suspense>
    </DashboardPage>
  );
}

export function MonitoringPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Query Logs"
      area="Monitoring"
      description="Understand application health across requests, functions, and traces."
      metrics={[
        { label: 'Requests', value: '2.4M' },
        { label: 'Errors', value: '0.02%' },
        { label: 'Latency', value: '84ms' },
      ]}
      teamSlug={teamSlug}
      title="Monitoring"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <MonitoringRows teamSlug={teamSlug} />
      </Suspense>
    </DashboardPage>
  );
}

export function MonitoringQueryPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Run Query"
      area="Monitoring"
      description="Search logs, traces, and metrics with shared dashboard filters."
      metrics={[
        { label: 'Window', value: '24h' },
        { label: 'Matches', value: '481' },
        { label: 'Saved', value: '6' },
      ]}
      teamSlug={teamSlug}
      title="Query"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <MonitoringQueryRows />
      </Suspense>
    </DashboardPage>
  );
}

export function MonitoringAlertsPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Create Alert"
      area="Monitoring"
      description="Configure alerts for errors, latency, traffic, and spend."
      metrics={[
        { label: 'Active', value: '5' },
        { label: 'Muted', value: '1' },
        { label: 'Triggered', value: '0' },
      ]}
      teamSlug={teamSlug}
      title="Alerts"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <MonitoringAlertRows />
      </Suspense>
    </DashboardPage>
  );
}

export function SettingsPageContent({ teamSlug }: { teamSlug: string }) {
  return (
    <DashboardPage
      action="Invite Member"
      area="Settings"
      description="Manage team members, billing, security, and dashboard preferences."
      metrics={[
        { label: 'Members', value: '18' },
        { label: 'Teams', value: '4' },
        { label: 'SSO', value: 'On' },
      ]}
      teamSlug={teamSlug}
      title="Settings"
    >
      <Suspense fallback={<RowsSkeleton />}>
        <SettingsRows />
      </Suspense>
    </DashboardPage>
  );
}

async function ProjectRows({ teamSlug }: { teamSlug: string }) {
  return <DataTable label="Recent projects" rows={await getProjectRows(teamSlug)} />;
}

async function DeploymentRows({ teamSlug }: { teamSlug: string }) {
  return <DataTable label="Recent deployments" rows={await getDeploymentRows(teamSlug)} />;
}

async function ApiSetupRows() {
  return <DataTable label="API setup" rows={await getApiSetupRows()} />;
}

async function ApiQuickStartRows() {
  return <DataTable label="Quick start" rows={await getApiQuickStartRows()} />;
}

async function ApiKeyRows({ teamSlug }: { teamSlug: string }) {
  return <DataTable label="Keys" rows={await getApiKeyRows(teamSlug)} />;
}

async function ApiProviderRows() {
  return <DataTable label="Providers" rows={await getApiProviderRows()} />;
}

async function ApiSettingsRows() {
  return <DataTable label="Settings" rows={await getApiSettingsRows()} />;
}

async function MonitoringRows({ teamSlug }: { teamSlug: string }) {
  return <DataTable label="Signals" rows={await getMonitoringRows(teamSlug)} />;
}

async function MonitoringQueryRows() {
  return <DataTable label="Recent queries" rows={await getMonitoringQueryRows()} />;
}

async function MonitoringAlertRows() {
  return <DataTable label="Alerts" rows={await getMonitoringAlertRows()} />;
}

async function SettingsRows() {
  return <DataTable label="Settings" rows={await getSettingsRows()} />;
}

function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <section className="cards" aria-label="Metrics">
      {metrics.map((metric) => (
        <div className="card" key={metric.label}>
          <span className="metric">{metric.label}</span>
          <strong className="value">{metric.value}</strong>
        </div>
      ))}
    </section>
  );
}

function DataTable({ label, rows }: { label: string; rows: Row[] }) {
  return (
    <section className="section" aria-label={label}>
      {rows.map((row) => (
        <div className="row" key={row.name}>
          <span>{row.name}</span>
          <span>{row.detail}</span>
          <span className="status">{row.status}</span>
        </div>
      ))}
    </section>
  );
}

function RowsSkeleton() {
  return (
    <section className="section" aria-label="Loading rows">
      {Array.from({ length: 3 }, (_, index) => (
        <div className="row" key={index}>
          <span className="skeleton skeleton-line" />
          <span className="skeleton skeleton-line" />
          <span className="skeleton skeleton-line" />
        </div>
      ))}
    </section>
  );
}
