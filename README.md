# Sidebar Subnav Demo

A minimal Next.js 16 dashboard showing a persistent sidebar, nested product
navigation, and Partial Prefetching with session-dependent shell data.

## Problem 1: The destination should be clear in the first paint

A direct visit to a nested route should not briefly show another product or a
generic page before the destination appears.

### Fix

Each page renders its product title, description, action, and metrics
synchronously. The page owns a narrow Suspense boundary around request-scoped
rows, so the App Shell identifies the correct destination while fresh data
streams behind a stable fallback.

## Problem 2: The sidebar should keep its state during navigation

Putting the sidebar in a child route can replace it when moving between product
sections. That can expose a network wait and reset local state such as scroll
position or whether the nested pane is open.

### Fix

The team layout owns one persistent sidebar. Its nested pane definitions are
static route metadata already available to the client, while `usePathname()`
selects the current pane. Soft navigation updates that mounted sidebar without a
parallel route, a keyed boundary, or an optimistic pane switch.

## Problem 3: Route-aware navigation cannot be part of the shared static shell

The parent team layout does not know which child route is active while the
shared App Shell is prerendered. Rendering the top-level navigation as the
fallback would briefly show the wrong pane on a direct nested-route visit.

### Fix

The demo exposes both choices with the switch below the sidebar:

- **Fallback** renders a stable pane skeleton until `usePathname()` resolves the
  correct navigation. It avoids showing the wrong pane but has a loading state.
- **Inline** includes the static panes in the fallback and uses a pre-paint
  script to select the correct one. It avoids the loading state but duplicates a
  small amount of route-selection logic.

The separate active-link script follows
[Building an active NavLink component in Next.js](https://aurorascharff.no/posts/building-an-active-navlink-component-in-nextjs/).

A parallel route could server-render the exact pane, but crossing its segment
boundary could remount the pane and reset its internal state.

## Problem 4: Session data should not block soft navigation

Sidebar chrome often depends on cookies, the current user, permissions, or
flags. Treating all of that as uncached request work would make the same fallback
appear on every navigation.

### Fix

`getCurrentUser()` uses `"use cache: private"` with a five-minute stale time.
With Cache Components and Partial Prefetching, the default `<Link>` prefetch
includes that session-dependent UI in the route App Shell and caches it only in
the browser session. It still resolves fresh on a direct load.

Partial Prefetching does not decide which sidebar pane is active. It makes the
destination App Shell, including cacheable cookie-dependent UI, available
before a soft-navigation click, so the route can commit and `usePathname()` can
update the persistent sidebar without an optimistic pane switch.

The links intentionally do not use `prefetch={true}`. That opt-in is for work
that depends on per-link URL data such as `params` or `searchParams`; it is not
required for cookie-dependent shell data.

## Run

```sh
pnpm install
pnpm dev
```

Open `http://localhost:3000/acme/~/api/keys`.
