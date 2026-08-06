# Sidebar Subnav Demo

A small Next 16 App Router demo for a dashboard shell with nested sidebar
navigation, user-scoped shell data, and route active state.

## Problem 1: The First Paint Can Show The Wrong Product

A dashboard entry route should paint the correct product area immediately. If
the shell starts generic and later swaps to the destination-specific UI, the user
sees a flash of the wrong experience.

## Fix 1: Keep Product-Specific UI In The Route

Each route owns its page content and primary action. Navigation metadata only
describes links. The page for `/[teamSlug]/~/api/keys` renders the keys page;
it does not ask the sidebar model what the page title or action should be.

## Problem 2: The Sidebar Should Not Remount During Soft Navigation

If nested sidebar content is owned by child routes, moving from a top-level route
into a nested route can replace the whole sidebar while the next route resolves.
That exposes a sidebar fallback during normal navigation.

## Fix 2: Keep The Sidebar In The Layout

The team layout renders the sidebar next to `children`. The sidebar stays
mounted while page content changes. It does not optimistically switch panes on
click; the nested pane opens when the pathname changes.

## Problem 3: User Shell Data Is Not Shared Static Data

Dashboard chrome often depends on the current user, team role, permissions, or
flags. That data can depend on cookies or headers, so plain `"use cache"` is the
wrong cache boundary.

## Fix 3: Use Private Cache For Session Data

`features/account/account-queries.ts` uses `"use cache: private"` for the
current user. The result can be reused in the browser session without becoming a
shared server cache entry.

## Problem 4: URL Data Does Not Belong In The Shared Shell

The route pathname, params, and search params vary per link. If the app reads
that URL data in the wrong place, the shared shell becomes tied to one
destination.

## Fix 4: Keep URL State Behind The Right Boundary

Pages stay synchronous and resolve `params` with `params.then(...)` inside their
Suspense boundary. The sidebar active state is client-side URL state via
`usePathname()`.

## Problem 5: Active State Can Flicker Before Hydration

If active state only appears after the client hydrates, a hard reload can briefly
paint links as inactive.

## Fix 5: Seed Active Links Before Hydration

`NavLinkScript` is a tiny root script that marks matching links with
`aria-current="page"` during HTML parse. It only updates link state; it does not
reimplement navigation.

## Problem 6: Prefetching Has Different Jobs

Partial Prefetching gives links the route App Shell by default. Runtime
prefetching with `prefetch={true}` is for URL-specific dynamic work and costs a
server invocation per prefetchable link.

## Fix 6: Do Not Use `prefetch={true}` By Default

The sidebar links do not set `prefetch={true}`. The demo keeps URL-specific page
data behind page Suspense boundaries, so it is clear what belongs to the shell
and what streams later. Runtime prefetch should be an explicit choice for links
where fetching URL-specific data before click is worth the extra server work.

## Problem 7: Parallel Routes Are Not The Default Fix

A parallel route can let a child route own a sidebar slot, but that is only
useful when the actual server-rendered sidebar structure must differ by child
route.

## Fix 7: Do Not Use A Parallel Route For Active State

This demo does not use an `@sidebar` route. The problem being modeled is active
state and stable layout chrome, so the smaller fix is a layout-owned sidebar
plus the pre-hydration active-state script.

## Run

```sh
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000/acme/~/api/keys
```

To force a cold local build cache:

```sh
pnpm clean
pnpm dev
```
