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
import Blocker from '../blocker';

const Cart = React.lazy(() => loadRemoteModule('cart', './Module'));

const Blog = React.lazy(() => loadRemoteModule('blog', './Module'));

const Shop = React.lazy(() => loadRemoteModule('shop', './Module'));

const rootRoute = createRootRoute({
  component: () => {
    return (
      <div>
        <h1>Welcome to React Router!</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/cart">Cart</Link>
          </li>

          <li>
            <Link to="/blog">Blog</Link>
          </li>

          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
        <Blocker>
          <Outlet />
        </Blocker>
      </div>
    );
  },
});

const indexRoute = createRoute({
  path: '/',
  getParentRoute() {
    return rootRoute;
  },
  component: () => <h1>Hello</h1>,
});

const cartRoute = createRoute({
  path: '/cart',
  component: Cart,
  getParentRoute() {
    return rootRoute;
  },
});

const blogRoute = createRoute({
  path: '/blog',
  component: Blog,
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
const routeTree = rootRoute.addChildren([
  indexRoute,
  cartRoute,
  blogRoute,
  shopRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
