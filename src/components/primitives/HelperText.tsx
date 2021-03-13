import React from 'react'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  /**
     * Defines the color of the helper text (the same as with Input, Select, etc.)
     */
  valid?: boolean;

  show?: boolean;
}

export const HelperText = React.forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { children, valid, className, show = true, ...other } = props

  const baseStyle = theme.helperText.base
  const validStyle = theme.helperText.valid
  const invalidStyle = theme.helperText.invalid

  const validationStyle = (valid: boolean | undefined): string => {
    if (!show) {
      return validStyle
    }

    switch (valid) {
    case true:
      return validStyle
    case false:
      return invalidStyle
    default:
      return ''
    }
  }

  const cls = classNames(baseStyle, validationStyle(valid), className)

  return (
    <span className={cls} ref={ref} {...other}>
      {show && children}
      {!show && <p>&nbsp;</p>}
    </span>
  )
})
