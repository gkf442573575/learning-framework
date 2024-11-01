import type { FormProps } from 'antd'
import type { LoginForm } from '@/interfaces'

import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'

import { useAuth } from '@/contexts/useAuth'

const Login = () => {
  const { isLogin, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
    await login(values)
  }

  const onFinishFailed: FormProps<LoginForm>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (isLogin) {
      const from = location.state?.from?.pathname || '/'
      const search = location.state?.from?.search || ''
      navigate(`${from}${search}`, { replace: true })
    }
  }, [isLogin])

  return (
    <div className="base-card center-box w-[600px]">
      <div className="my-4 ml-10 font-semibold text-blue-600 text-2xl">登录</div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item<LoginForm>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<LoginForm>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login

export const Component = Login
