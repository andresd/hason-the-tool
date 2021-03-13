import React, {  } from 'react'

import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-terminal'
import '../../assets/main.css'
import classNames from 'classnames'

interface JsonRawEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  onTextChange?: (value: string) => void;
  readOnly?: boolean;
}

export const JsonRawEditor = (props: JsonRawEditorProps) => {
  const { text = '', className, onTextChange = () => {} } = props

  const onValueChange = (value: string) => {
    onTextChange(value)
  }

  return (
    <div className={classNames('h-full bg-gray-700', className)}>
      <AceEditor
        mode="json"
        value={text}
        onChange={onValueChange}
        theme="terminal"
        width="100%"
        height="100%"
        style={{ background: '#2d2d2d'}}
      />
    </div>
  )
}
