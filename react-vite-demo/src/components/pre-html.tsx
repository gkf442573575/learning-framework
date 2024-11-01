import { Button } from 'antd'
import { FC } from 'react'

interface PreHtmlProps {
  content: string
  send?: (data: string) => void
}

const PreHtml: FC<PreHtmlProps> = ({ content, send }) => {

  const sendMsg = () => {
    send && send('props send')
  }


  return (
    <>
      <pre className='my-2 px-2' dangerouslySetInnerHTML={{ __html: content }}></pre>
      <Button type="dashed" onClick={sendMsg}>SEND</Button>
    </>
  )
}

export default PreHtml
