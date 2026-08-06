import {
  getRouteSection,
  routeDefinitions,
  sidebarSections,
  type RouteTemplate,
} from '@/features/navigation/navigation-model';
import { Suspense } from 'react';
import { getRows } from '../dashboard-queries';

export function PageSurface({
  route,
  teamSlug,
}: {
  route: RouteTemplate;
  teamSlug: string;
}) {
  const definition = routeDefinitions[route];
  const nestedKey = getRouteSection(route);
  const area = nestedKey ? sidebarSections[nestedKey].title : definition.label;

  return (
    <>
      <div className="topbar">
        <div className="breadcrumbs">{teamSlug} / {area}</div>
      </div>
      <div className="page">
        <header className="page-header">
          <div>
            <h1>{definition.label}</h1>
            <p>{definition.description}</p>
          </div>
          <button className="primary" type="button">{definition.action}</button>
        </header>

        <Suspense fallback={<RowsSkeleton />}>
          <Rows teamSlug={teamSlug} />
        </Suspense>
      </div>
    </>
  );
}

export function PageSurfaceSkeleton() {
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

async function Rows({ teamSlug }: { teamSlug: string }) {
  const rows = await getRows(teamSlug);

  return (
    <section className="section" aria-label="Rows">
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
