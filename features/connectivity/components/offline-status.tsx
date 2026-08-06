'use client';

import { useOffline } from 'next/offline';

export function OfflineStatus() {
  const offline = useOffline();

  if (!offline) return null;

  return (
    <div className="offline-status" role="status">
      <span className="offline-status-dot" />
      Offline. Waiting to reconnect.
    </div>
  );
}
