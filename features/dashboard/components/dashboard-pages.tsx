import {
  getApiKeyRows,
  getDeploymentRows,
  getMonitoringRows,
  getProjectRows,
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

export function DashboardHeader({
  action,
  area,
  description,
  teamSlug,
  title,
}: {
  action: string;
  area: string;
  description: string;
  teamSlug: string;
  title: string;
}) {
  return (
    <>
      <div className="topbar">
        <div className="breadcrumbs">{teamSlug} / {area}</div>
      </div>
      <header className="page-header">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="primary" type="button">{action}</button>
      </header>
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
      </div>
    </>
  );
}

export async function ProjectsOverview({ teamSlug }: { teamSlug: string }) {
  const rows = await getProjectRows(teamSlug);

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
      rows={rows}
      tableLabel="Recent projects"
      teamSlug={teamSlug}
      title="Projects"
    />
  );
}

export async function DeploymentsPageContent({ teamSlug }: { teamSlug: string }) {
  const rows = await getDeploymentRows(teamSlug);

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
      rows={rows}
      tableLabel="Recent deployments"
      teamSlug={teamSlug}
      title="Deployments"
    />
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
      rows={[
        { detail: 'Guide', name: 'Quick Start', status: 'Ready' },
        { detail: 'Credentials', name: 'Keys', status: 'Active' },
        { detail: 'Routing', name: 'Providers', status: 'Configured' },
      ]}
      tableLabel="API setup"
      teamSlug={teamSlug}
      title="API"
    />
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
      rows={[
        { detail: 'Environment', name: 'Add API_KEY', status: 'Required' },
        { detail: 'SDK', name: 'Install client', status: 'Ready' },
        { detail: 'Request', name: 'Send test call', status: 'Next' },
      ]}
      tableLabel="Quick start"
      teamSlug={teamSlug}
      title="Quick Start"
    />
  );
}

export async function ApiKeysPageContent({ teamSlug }: { teamSlug: string }) {
  const rows = await getApiKeyRows(teamSlug);

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
      rows={rows}
      tableLabel="Keys"
      teamSlug={teamSlug}
      title="Keys"
    />
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
      rows={[
        { detail: 'Primary', name: 'Provider A', status: 'Healthy' },
        { detail: 'Fallback', name: 'Provider B', status: 'Healthy' },
        { detail: 'Embeddings', name: 'Provider C', status: 'Healthy' },
      ]}
      tableLabel="Providers"
      teamSlug={teamSlug}
      title="Providers"
    />
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
      rows={[
        { detail: 'Traffic', name: 'Retry failed requests', status: 'Enabled' },
        { detail: 'Usage', name: 'Store request metadata', status: 'Enabled' },
        { detail: 'Spend', name: 'Monthly budget alert', status: 'Enabled' },
      ]}
      tableLabel="Settings"
      teamSlug={teamSlug}
      title="Settings"
    />
  );
}

export async function MonitoringPageContent({ teamSlug }: { teamSlug: string }) {
  const rows = await getMonitoringRows(teamSlug);

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
      rows={rows}
      tableLabel="Signals"
      teamSlug={teamSlug}
      title="Monitoring"
    />
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
      rows={[
        { detail: 'error:false', name: 'status:200', status: '481 hits' },
        { detail: 'region:iad', name: 'duration:<100', status: '312 hits' },
        { detail: 'path:/api/*', name: 'method:POST', status: '89 hits' },
      ]}
      tableLabel="Recent queries"
      teamSlug={teamSlug}
      title="Query"
    />
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
      rows={[
        { detail: 'Error rate', name: 'Production errors', status: 'Active' },
        { detail: 'Latency', name: 'P95 over 500ms', status: 'Active' },
        { detail: 'Spend', name: 'Monthly budget', status: 'Active' },
      ]}
      tableLabel="Alerts"
      teamSlug={teamSlug}
      title="Alerts"
    />
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
      rows={[
        { detail: 'Access', name: 'Members and roles', status: 'Configured' },
        { detail: 'Billing', name: 'Plan and invoices', status: 'Current' },
        { detail: 'Security', name: 'Authentication', status: 'Enforced' },
      ]}
      tableLabel="Settings"
      teamSlug={teamSlug}
      title="Settings"
    />
  );
}

function DashboardPage({
  action,
  area,
  description,
  metrics,
  rows,
  tableLabel,
  teamSlug,
  title,
}: {
  action: string;
  area: string;
  description: string;
  metrics: Metric[];
  rows: Row[];
  tableLabel: string;
  teamSlug: string;
  title: string;
}) {
  return (
    <>
      <DashboardHeader
        action={action}
        area={area}
        description={description}
        teamSlug={teamSlug}
        title={title}
      />
      <div className="page">
        <MetricGrid metrics={metrics} />
        <DataTable label={tableLabel} rows={rows} />
      </div>
    </>
  );
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
