
import React, { forwardRef } from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const Backdrop = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, ...other } = props

  const baseStyle = theme.backdrop.base

  const cls = classNames(baseStyle, className)
  return <div className={cls} ref={ref} {...other} />
})
