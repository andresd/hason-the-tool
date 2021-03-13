import React, { createElement, forwardRef } from 'react'
import classNames from 'classnames'
import theme from './themes/default'
import { logs } from '../../services/logService'

type IconType =
    | string
    | React.FunctionComponent<{ className: string; 'aria-hidden': boolean }>
    | React.ComponentClass<{ className: string; 'aria-hidden': boolean }>

export interface Props {
  children?: React.ReactNode;
  /**
     * Defines if the button is disabled
     */
  disabled?: boolean;
  /**
     * The size of the button
     */
  size?: 'larger' | 'large' | 'regular' | 'small' | 'pagination';
  /**
     * Shows only one icon inside the button; defaults to left
     */
  icon?: IconType;
  /**
     * Shows an icon inside the button, left aligned
     */
  iconLeft?: IconType;
  /**
     * Shows an icon inside the button, right aligned
     */
  iconRight?: IconType;
  /**
     * The style of the button
     */
  layout?: 'outline' | 'link' | 'primary' | '__dropdownItem';
  /**
     * Shows the button as a block (full width)
     */
  block?: boolean;
}

export interface ButtonAsButtonProps extends Props, React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
     * The element that should be rendered as a button
     */
  tag?: 'button';
  /**
     * The native HTML button type
     */
  type?: 'button' | 'submit' | 'reset';
}

export interface ButtonAsAnchorProps extends Props, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: 'a';
}

export interface ButtonAsOtherProps extends Props, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  tag: string;
}

export type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps | ButtonAsOtherProps

type Ref = React.ReactNode | HTMLElement | string

export const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const {
    tag = 'button',
    // Fix https://github.com/estevanmaito/windmill-react-ui/issues/7
    type = tag === 'button' ? 'button' : undefined,
    disabled = false,
    size = 'regular',
    layout = 'primary',
    block = false,
    icon,
    iconLeft,
    iconRight,
    className,
    children,
    ...other
  } = props

  const hasIcon = () => {
    return !!icon || !!iconLeft || !!iconRight
  }

  logs.warning(
    { hasIcon: hasIcon() && !other['aria-label'] && !children },
    'Button',
    'You are using an icon button, but no "aria-label" attribute was found. Add an "aria-label" attribute to work as a label for screen readers.'
  )

  const IconLeft = iconLeft || icon
  const IconRight = iconRight

  const baseStyle = theme.button.base
  const blockStyle = theme.button.block
  const sizeStyles = {
    larger: theme.button.size.larger,
    large: theme.button.size.large,
    regular: theme.button.size.regular,
    small: theme.button.size.small,
    /**
         * Only used in Pagination.
         * Not meant for general use.
         */
    pagination: theme.button.size.pagination
  }
  const iconSizeStyles = {
    larger: theme.button.size.icon.larger,
    large: theme.button.size.icon.large,
    regular: theme.button.size.icon.regular,
    small: theme.button.size.icon.small,
    pagination: theme.button.size.icon.regular
  }
  const iconStyle = theme.button.icon[size]
  const layoutStyles = {
    primary: theme.button.primary.base,
    outline: theme.button.outline.base,
    link: theme.button.link.base
  }
  const activeStyles = {
    primary: theme.button.primary.active,
    outline: theme.button.outline.active,
    link: theme.button.link.active
  }
  const disabledStyles = {
    primary: theme.button.primary.disabled,
    outline: theme.button.outline.disabled,
    link: theme.button.link.disabled
  }

  /**
     * Only used in DropdownItem.
     * Not meant for general use.
     */
  const dropdownItemStyle = theme.button.dropdownItem.base

  const buttonStyles =
        layout === '__dropdownItem'
          ? classNames(dropdownItemStyle, className)
          : classNames(
            baseStyle,
            // has icon but no children
            hasIcon() && !children && iconSizeStyles[size],
            // has icon and children
            hasIcon() && children && sizeStyles[size],
            // does not have icon
            !hasIcon() && sizeStyles[size],
            layoutStyles[layout],
            disabled ? disabledStyles[layout] : activeStyles[layout],
            block ? blockStyle : null,
            className
          )

  const iconLeftStyles = classNames(iconStyle, children ? theme.button.icon.left : '')
  const iconRightStyles = classNames(iconStyle, children ? theme.button.icon.right : '')

  return createElement(
    tag,
    {
      className: buttonStyles,
      ref,
      disabled,
      type,
      ...other
    },
    IconLeft
      ? React.createElement(IconLeft, { className: iconLeftStyles, 'aria-hidden': true })
      : null,
    children,
    IconRight
      ? React.createElement(IconRight, { className: iconRightStyles, 'aria-hidden': true })
      : null
  )
})
