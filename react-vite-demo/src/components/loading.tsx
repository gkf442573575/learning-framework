import { Spin } from 'antd'

const Loading = () => {
  return (
    <div className="flex justify-center items-center fixed z-[9999] left-0 top-0 right-0 bottom-0 bg-transparent">
      <Spin size="large" />
    </div>
  )
}


export default Loading
