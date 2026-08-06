import 'server-only';
import { cacheLife } from 'next/cache';
import { cookies } from 'next/headers';
import type { CurrentUser } from './account-types';

export async function getCurrentUser(): Promise<CurrentUser> {
  'use cache: private';
  cacheLife({ stale: 300 });

  const session = (await cookies()).get('demo-session')?.value ?? 'guest';

  if (session === 'guest') {
    return {
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'Owner',
    };
  }

  return {
    email: `${session}@example.com`,
    name: 'Signed-in User',
    role: 'Member',
  };
}
