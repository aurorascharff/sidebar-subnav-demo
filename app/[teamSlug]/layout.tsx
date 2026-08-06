import { DashboardSidebar } from '@/features/navigation/components/dashboard-sidebar';

export default function TeamLayout({
  children,
  params,
}: LayoutProps<"/[teamSlug]">) {
  return (
    <div className="app-shell">
      <DashboardSidebar params={params} />
      <main className="main-content">{children}</main>
    </div>
  );
}
