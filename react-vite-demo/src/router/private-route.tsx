import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { ReactNode, Suspense } from 'react'

import { useAuth } from '@/contexts/useAuth'

import Loading from '@/components/loading'

export const SuspenseLoader = ({ element }: { element: ReactNode }) => {
  return <Suspense fallback={<Loading />}>{element}</Suspense>
}

export const PrivateRoute = ({ element }: { element: ReactNode }) => {
  const { isLogin, checkAuth } = useAuth()
  const location = useLocation()
  if (checkAuth) {
    return <Loading />
  }
  if (isLogin) {
    return <SuspenseLoader element={element}></SuspenseLoader>
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
}

export const PrivateChildrenRoute = () => {
  const { isLogin, checkAuth } = useAuth()
  const location = useLocation()

  if (checkAuth) {
    return <Loading />
  }
  return isLogin ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
