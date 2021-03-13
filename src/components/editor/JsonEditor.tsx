import React, { Suspense } from 'react'
import { useRecoilState } from 'recoil'
import { currentJsonState } from '../../atoms/content'
import { JsonRawEditor } from './JsonRawEditor'

interface JsonEditorProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const JsonEditor = (props: JsonEditorProps) => {
  const [content, setContent] = useRecoilState(currentJsonState)

  return (
    <Suspense fallback={<p>WTF?</p>}>
      <JsonRawEditor className={props.className} text={content} onTextChange={(value) => setContent(value)} readOnly={false} />
    </Suspense>
  )
}
