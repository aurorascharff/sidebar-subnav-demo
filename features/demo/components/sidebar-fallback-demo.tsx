import {
  InlineSidebarNavigationFallback,
  SidebarNavigationSkeleton,
} from '@/features/navigation/components/sidebar-fallbacks';

export function SidebarFallbackDemo() {
  return (
    <div className="sidebar-fallback-demo">
      <div className="sidebar-fallback-frame" data-sidebar-demo="fallback">
        <SidebarNavigationSkeleton />
      </div>
      <div className="sidebar-fallback-frame" data-sidebar-demo="inline" hidden>
        <InlineSidebarNavigationFallback />
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `(${applySidebarDemoMode.toString()})(document.currentScript.parentElement)`,
        }}
      />
    </div>
  );
}

function applySidebarDemoMode(root: HTMLElement | null) {
  if (!root) return;

  const inline = document.cookie
    .split('; ')
    .some((cookie) => cookie === 'sidebar-mode=inline');

  root.querySelector<HTMLElement>('[data-sidebar-demo="fallback"]')!.hidden = inline;
  root.querySelector<HTMLElement>('[data-sidebar-demo="inline"]')!.hidden = !inline;
}
