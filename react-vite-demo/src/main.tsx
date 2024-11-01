import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'

import './styles/main.scss'
import './styles/mixins.scss'
import './styles/tailwind.scss'

import router from './router'
import store from './stores'

import { AuthProvider } from './contexts/useAuth'

import Loading from './components/loading'

// 进行挂载
const container = document.getElementById('root')!
const app = createRoot(container)

app.render(
  <StrictMode>
    {/* store provider */}
    <Provider store={store}>
      {/* antd config provider */}
      <ConfigProvider locale={zhCN} theme={{ cssVar: true }}>
        {/* auth provider */}
        <AuthProvider>
          {/* router */}
          <RouterProvider router={router} fallbackElement={<Loading />}></RouterProvider>
        </AuthProvider>
      </ConfigProvider>
    </Provider>
  </StrictMode>
)
