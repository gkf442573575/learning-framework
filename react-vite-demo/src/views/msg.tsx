import { useState } from 'react'
import { Input, message } from 'antd'

import PreHtml from '@/components/pre-html'

import { useAuth } from '@/contexts/useAuth'

export default function Msg() {
  const { username } = useAuth()
  const [name, setName] = useState('')
  const childMsg = (msg: string) => {
    message.success(`child msg >>>> ${msg}`)
  }

  return (
    <div>
      <div className="text-3xl text-purple-600 font-semibold mx-auto my-20 text-center">Hello {username}</div>
      <PreHtml content={'<p class="text-orange-700 font-semibold text-lg">222</p>'} send={childMsg} />
      <div className="mt-4 text-orange-500 pl-3 font-semibold text-lg">{name}</div>
      <Input className="mt-4" value={name} onChange={(e) => setName(e.target.value)} placeholder='请输入' />
    </div>
  )
}

export const Component = Msg
