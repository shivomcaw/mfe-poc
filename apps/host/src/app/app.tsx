import * as React from 'react';
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { loadRemoteModule } from '@microfrontends/load-remote-module';
import ModuleFederationConfig from '../../module-federation.config';

const remotes = ModuleFederationConfig.remotes ?? [];

const Cart = React.lazy(() => loadRemoteModule('cd', './Module'));
const Shop = React.lazy(() => loadRemoteModule('shop', './Module'));

const rootRoute = createRootRoute({
  component: () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <h1>Welcome to Tanstack Router!</h1>
        <div style={{ display: 'flex', gap: 16 }}>
          <Link to="/">Home</Link>
          {remotes.map((remote) => {
            return (
              <Link key={remote} to={`/${remote}`}>
                {remote.toUpperCase()}
              </Link>
            );
          })}
        </div>
        <React.Suspense fallback={<h1>Loading...</h1>}>
          <Outlet />
        </React.Suspense>
      </div>
    );
  },
});

const indexRoute = createRoute({
  path: '/',
  getParentRoute() {
    return rootRoute;
  },
  component: () => <h1>Home</h1>,
});

const CDRoute = createRoute({
  path: '/cd',
  component: Cart,
  getParentRoute() {
    return rootRoute;
  },
});

const shopRoute = createRoute({
  path: '/shop',
  component: Shop,
  getParentRoute() {
    return rootRoute;
  },
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const routeTree = rootRoute.addChildren([indexRoute, CDRoute, shopRoute]);

const router = createRouter({ routeTree, notFoundMode: 'fuzzy' });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
