# Sidebar Subnav Demo

A small Next 16 App Router demo for a dashboard shell with nested sidebar
navigation.

## Problem 1: Section Clicks Should Not Remount The Sidebar

When sidebar state is owned by a child route, clicking from a top-level route
into a nested section can replace the whole sidebar while the next route
resolves. That can expose a Suspense fallback during normal navigation.

## Fix 1: Keep The Sidebar In The Layout

The team layout renders the sidebar next to `children`, so the sidebar shell is
mounted once for the team and does not remount when navigating between child
routes. That keeps nested section clicks from replacing the sidebar with its
Suspense fallback.

The sidebar does not optimistically switch panes on click. The nested pane opens
when the pathname changes to a nested section route.

## Problem 2: Request Pathname Reads Make The Shell Request-Bound

Reading the current pathname from request headers ties the shell to the request
and avoids the cache behavior this demo is meant to exercise.

## Fix 2: Keep Sidebar State Cheap

The layout receives team params from the route tree, and the active sidebar
state is derived from the shared route model. User-specific shell data is read
with `"use cache: private"` in `features/account/account-queries.ts`, so it can
depend on cookies without becoming shared server cache data.

There is no mocked delay in the sidebar. The only fake async delay in this demo
is the page content in `features/dashboard/dashboard-queries.ts`.

## Problem 3: Active State Can Flicker Before Hydration

If active state only comes from a hydrated client component, the server-rendered
sidebar and hydrated sidebar can briefly disagree.

## Fix 3: Seed The Active State Before Hydration

The links render with `data-navlink-href`, and a tiny root script marks the
matching link with `aria-current="page"` during HTML parse. The route model is
still shared by the server sidebar and the hydrated client sidebar.

## Tradeoff

This version intentionally does not use a parallel route. It focuses on keeping
the layout sidebar mounted while using a small pre-hydration script for active
link styling.

## Run

```sh
pnpm install
pnpm dev
```

Then open:

```text
http://localhost:3000/acme/~/api/keys
```

To reproduce a cold local load:

```sh
pnpm clean
pnpm dev
```
