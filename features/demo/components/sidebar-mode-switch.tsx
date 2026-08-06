'use client';

import { useEffect, useState } from 'react';

type SidebarMode = 'fallback' | 'inline';

export function SidebarModeSwitch() {
  const [mode, setMode] = useState<SidebarMode>('fallback');

  useEffect(() => {
    setMode(readSidebarMode());
  }, []);

  function selectMode(nextMode: SidebarMode) {
    document.cookie = `sidebar-mode=${nextMode}; Path=/; Max-Age=31536000; SameSite=Lax`;
    const url = new URL(window.location.href);
    url.searchParams.delete('sidebar');
    window.location.replace(url);
  }

  return (
    <div className="sidebar-mode-switch" role="group" aria-label="Sidebar fallback">
      <button
        aria-pressed={mode === 'fallback'}
        onClick={() => selectMode('fallback')}
        type="button"
      >
        Fallback
      </button>
      <button
        aria-pressed={mode === 'inline'}
        onClick={() => selectMode('inline')}
        type="button"
      >
        Inline
      </button>
    </div>
  );
}

function readSidebarMode(): SidebarMode {
  return document.cookie
    .split('; ')
    .some((cookie) => cookie === 'sidebar-mode=inline')
    ? 'inline'
    : 'fallback';
}
