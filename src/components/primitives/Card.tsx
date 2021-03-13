import React from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
     * Removes default styles (if true) so you can override with your own background styles
     */
  colored?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children, colored = false, ...other } = props

  const baseStyle = theme.card.base
  const uncoloredStyle = theme.card.default

  const cls = classNames(baseStyle, !colored && uncoloredStyle, className)

  return (
    <div className={cls} ref={ref} {...other}>
      {children}
    </div>
  )
})
