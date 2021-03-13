
import React from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const ModalHeader = React.forwardRef<HTMLParagraphElement, Props>((props, ref) => {
  const { children, className, ...other } = props

  const baseStyle = theme.modalHeader.base

  const cls = classNames(baseStyle, className)

  return (
    <p className={cls} ref={ref} {...other}>
      {children}
    </p>
  )
})
