import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { lazy } from 'react'

import { SuspenseLoader, PrivateRoute, PrivateChildrenRoute } from './private-route'

const Home = lazy(() => import('@/views/home'))
const About = lazy(() => import('@/views/about'))
const Msg = lazy(() => import('@/views/msg'))

const routes: RouteObject[] = [
  {
    path: '',
    element: <PrivateChildrenRoute />,
    children: [
      {
        path: '/',
        element: <SuspenseLoader element={<Home />} />
      },
      {
        path: '/about',
        // element: <SuspenseLoader element={<About />} />
        lazy: () => import('@/views/about')
      }
    ]
  },
  {
    path: '/login',
    lazy: () => import('@/views/login')
  },
  {
    path: '/msg',
    element: <PrivateRoute element={<Msg />} />
  }
]

const router = createBrowserRouter(routes)

export default router
