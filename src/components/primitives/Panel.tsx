import classNames from 'classnames'
import React from 'react'
import '../../assets/main.css'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hFull?: boolean;
}

export const Panel = (props: Props) => {
  const { hFull = true, style } = props
  return (
    <div style={style} className={classNames(`${hFull ? 'h-full' : ''} px-3 py-2 border-gray-200 border-solid border`, props.className)}>
      {props.children}
    </div>
  )
}
