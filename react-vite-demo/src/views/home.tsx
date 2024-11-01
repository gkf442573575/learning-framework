// import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import { Button } from 'antd'
import { useAppSelector, appGetters } from '@/stores'

import { useAuth } from '@/contexts/useAuth'

export default function Home() {
  // const [count, setCount] = useState(0)
  const { username } = useAuth()
  const navigate = useNavigate()

  const count = useAppSelector(appGetters.count)
  const goAbout = () => {
    navigate(`/about?name=123`)
  }

  const goMsg = () => {
    navigate(`/msg`)
  }

  return (
    <>
      <div className="text-3xl text-purple-600 font-semibold mx-auto my-20 text-center">
        Hello {username}
      </div>
      <div className="text-3xl text-orange-600 font-semibold mx-auto my-20 text-center">
        count: {count}
      </div>
      <Button onClick={goAbout}>Go About</Button>
      <Button onClick={goMsg} danger className="ml-4">
        Go Msg
      </Button>
    </>
  )
}
