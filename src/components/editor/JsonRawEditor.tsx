import React, {  } from 'react'

import AceEditor, { IMarker } from 'react-ace'

import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-terminal'
import '../../assets/main.css'
import './ace.css'

interface JsonRawEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  onTextChange?: (value: string) => void;
  readOnly?: boolean;
  markers?: IMarker[];
}

export const JsonRawEditor = (props: JsonRawEditorProps) => {
  const { text = '', className, onTextChange = () => {}, markers } = props

  const onValueChange = (value: string) => {
    onTextChange(value)
  }

  return (
    <AceEditor
      mode="json"
      value={text}
      onChange={onValueChange}
      theme="terminal"
      width="100%"
      height="100%"
      markers={markers}
      editorProps={{ $blockScrolling: true }}
      style={{ background: '#2d2d2d' }}
      setOptions={{ autoScrollEditorIntoView: true }}
    />
  )
}
