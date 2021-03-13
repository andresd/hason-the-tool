import React, { forwardRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  /**
     * The type of the badge
     */
  type?: 'success' | 'danger' | 'warning' | 'neutral' | 'primary';
}

export const Badge = forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { className, children, type = 'primary', ...other } = props

  const baseStyle = theme.badge.base
  const typeStyle = {
    success: theme.badge.success,
    danger: theme.badge.danger,
    warning: theme.badge.warning,
    neutral: theme.badge.neutral,
    primary: theme.badge.primary
  }

  const cls = classNames(baseStyle, typeStyle[type], className)

  return (
    <span className={cls} ref={ref} {...other}>
      {children}
    </span>
  )
})
