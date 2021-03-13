import React, { useContext } from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const ModalFooter = React.forwardRef<HTMLElement, Props>((props, ref) => {
  const { children, className, ...other } = props

  const baseStyle = theme.modalFooter.base

  const cls = classNames(baseStyle, className)

  return (
    <footer className={cls} ref={ref} {...other}>
      {children}
    </footer>
  )
})
