import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import jsCookie from 'js-cookie'
import { enc } from 'crypto-js'

import type { LoginForm } from '@/interfaces'

interface AuthContextType {
  isLogin: boolean
  checkAuth: boolean
  username: string
  token: string
  login: (data: LoginForm) => Promise<string>
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLogin: false,
  checkAuth: true,
  username: '',
  token: '',
  login: () => Promise.resolve(''),
  logout: () => {}
})

export const TOKEN_KEY = 'REACT_TEST_DEMO_TOKEN'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setLogin] = useState(false)
  const [username, setUserName] = useState('')
  const [token, setToken] = useState('')
  const [checkAuth, setCheckAuth] = useState(true)

  const login = ({ username, password }: LoginForm) => {
    return new Promise<string>((resolve, reject) => {
      try {
        setLogin(true)
        // 保存用户名
        setUserName(username)
        // 生成一个token
        const token = enc.Utf8.parse(`${username}@${password}`).toString(enc.Base64)
        jsCookie.set(TOKEN_KEY, token, { expires: 1 })
        setToken(token)
        resolve('登录成功')
      } catch (error) {
        reject(error)
      }
    })
  }
  const logout = () => {
    setLogin(false)
    // 删除用户名
    setUserName('')
    // 删除token
    jsCookie.remove(TOKEN_KEY)
    setToken('')

  }

  const initToken = () => {
    const token = jsCookie.get(TOKEN_KEY)
    if (token) {
      const utf8Token = enc.Base64.parse(token).toString(enc.Utf8)
      const username = utf8Token.split('@')[0]
      setUserName(username)
      setLogin(true)
      setToken(token)
    }
    setCheckAuth(false)
  }

  useEffect(() => {
    initToken()
  }, [])

  return (
    <AuthContext.Provider value={{ isLogin, checkAuth, username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
