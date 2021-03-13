import React from 'react'
import classNames from 'classnames'
import { ButtonProps, Button } from './Button'

import theme from './themes/default'

type Ref = typeof Button
export const DropdownItem = React.forwardRef<Ref, ButtonProps>((props, ref) => {
  // Note: className is passed to the inner Button
  const { children, className, ...other } = props

  const dropdownItem = theme.dropdownItem

  const baseStyle = dropdownItem.base

  const cls = classNames(baseStyle, className)

  return (
    <li className={cls}>
      <Button layout='__dropdownItem' ref={ref} {...other}>
        {children}
      </Button>
    </li>
  )
})
