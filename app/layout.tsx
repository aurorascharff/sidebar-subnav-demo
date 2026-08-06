import type { Metadata, Viewport } from 'next';
import { OfflineStatus } from '@/features/connectivity/components/offline-status';
import './globals.css';

export const metadata: Metadata = {
  description: 'A minimal dashboard sidebar route-shell prototype.',
  title: {
    default: 'Sidebar Prototype',
    template: '%s - Sidebar Prototype',
  },
};

export const viewport: Viewport = {
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <OfflineStatus />
      </body>
    </html>
  );
}
