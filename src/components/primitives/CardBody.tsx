import React from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

export const CardBody = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children, ...other } = props

  const baseStyle = theme.cardBody.base

  const cls = classNames(baseStyle, className)

  return (
    <div className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})

export const CardHeader = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children, ...other } = props

  const baseStyle = theme.cardHeader.base

  const cls = classNames(baseStyle, className)

  return (
    <div className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})

export const CardFooter = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children, ...other } = props

  const baseStyle = theme.cardFooter.base

  const cls = classNames(baseStyle, className)

  return (
    <div className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})
