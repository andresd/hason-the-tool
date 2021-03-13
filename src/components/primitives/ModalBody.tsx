import React, { useContext } from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const ModalBody = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...other } = props

  const baseStyle = theme.modalBody.base

  const cls = classNames(baseStyle, className)

  return (
    <div className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})
