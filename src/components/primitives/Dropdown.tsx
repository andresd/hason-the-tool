/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useRef } from 'react'
import { Transition } from './Transition'
import FocusLock from 'react-focus-lock'
import classNames from 'classnames'
import theme from './themes/default'

interface Props extends React.HTMLAttributes<HTMLUListElement> {
  /**
     * Function executed when the dropdown is closed
     */
  onClose: () => void;
  /**
     * Defines if the dropdown is open
     */
  isOpen: boolean;
  /**
     * Defines the alignement of the dropdown related to its parent
     */
  align?: 'left' | 'right';
}

export const Dropdown = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, onClose, isOpen, className, align = 'left', ...other } = props
  const dropdown = theme.dropdown

  const baseStyle = dropdown.base
  const alignStyle = dropdown.align[align]

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      onClose()
    }
  }

  const dropdownRef = useRef<HTMLUListElement>(null)
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, { capture: true })
    document.addEventListener('keydown', handleEsc, { capture: true })
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen])

  const cls = classNames(baseStyle, alignStyle, className)

  return (
    <Transition
      show={isOpen}
      leave='transition ease-out duration-150'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div ref={ref}>
        <FocusLock returnFocus>
          <ul className={cls} ref={dropdownRef} aria-label='submenu' {...other}>
            {children}
          </ul>
        </FocusLock>
      </div>
    </Transition>
  )
})
