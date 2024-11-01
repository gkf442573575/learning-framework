import { useLoaderData, useSearchParams, type LoaderFunction } from 'react-router-dom'
import { useState } from 'react'


import { Button, Input } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

import { getUrlParams } from '@/utils/index'
import { useAppSelector, useAppDispatch, appGetters } from '@/stores/index'
import { add, minus, addByNum, incrementAsync } from '@/stores/modules/counter'

import { useAuth } from '@/contexts/useAuth'

// 加载之前获取参数进行预处理
export const loader: LoaderFunction = async ({ request }) => {
  const params = getUrlParams(request.url)
  console.log('url params >>>>', params)

  return 'test'
}

const About = () => {
  const { username, logout } = useAuth()

  const count = useAppSelector(appGetters.count)
  const status = useAppSelector(appGetters.status)
  const dispatich = useAppDispatch()

  const [num, setNum] = useState(0)

  const [query] = useSearchParams()
  const name = query.get('name')
  // console.log('name >>>', name)
  const data = useLoaderData()
  // console.log('loader data >>>', data)

  const changeNum = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(evt.target.value)
    if (!isNaN(num)) {
      setNum(num)
    }
  }


  return (
    <>
      <div className="text-3xl text-purple-600 font-semibold mx-auto my-20 text-center">
        Hello {username}
      </div>
      <div className="flex items-center my-20 mx-auto w-56">
        <Button type="primary" icon={<MinusOutlined />} onClick={() => dispatich(minus())} />
        <p className="flex-1 pt-1 text-center">{count}</p>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => dispatich(add())} />
      </div>
      <div className="flex items-center my-20 mx-auto w-56">
        <Input value={num} onChange={changeNum} />
        <Button type="primary" className="ml-2" onClick={() => dispatich(addByNum(num))}>
          By Num
        </Button>
      </div>
      <div className="flex items-center my-20 mx-auto w-56">
        <div className="flex-1">{status}</div>
        {/* 通过 redux-thunk 异步操作 */}
        <Button type="primary" className="ml-2" onClick={() => dispatich(incrementAsync(num))}>
          By Async
        </Button>
      </div>
      <div className="flex items-center my-20 mx-auto w-56 justify-center">
        <Button type="primary" onClick={logout} >
          Logout
        </Button>
      </div>
    </>
  )
}

export default About

export const Component = About
