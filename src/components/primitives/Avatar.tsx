import React, { forwardRef, HTMLAttributes } from 'react'
import theme from './themes/default'
import classNames from 'classnames'

const getInitials = (...names): string => {
  return (names.join(' ')).split(' ').map((n, i, a) => i === 0 || i + 1 === a.length ? n[0] : null).join('').toUpperCase()
}

const Colors = [
  '#5b876f',
  '#b2b7bb',
  '#70a8ab',
  '#f6af28',
  '#0188b9',
  '#f18535',
  '#d93b37',
  '#a6b12d',
  '#5b9bbd',
  '#f5878b'
]

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  size?: 'small' | 'medium' | 'large';
  fullName?: string | null;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props: AvatarProps, ref) => {
  const { size = 'medium', src, alt, className, fullName = 'John Dow', ...other } = props

  const baseStyle = theme.avatar.base
  const sizeStyles = {
    large: theme.avatar.size.large,
    medium: theme.avatar.size.medium,
    small: theme.avatar.size.small
  }

  const getColor = () => {
    if (!src && fullName) {
      const index = fullName.charCodeAt(0) % 10
      return Colors[index]
    }
    return 'rgba(25,118,210,1)'
  }

  const cls = classNames(baseStyle, sizeStyles[size], className)

  return (
    <div className={cls} ref={ref} {...other}>
      {!src &&
        <div style={{ backgroundColor: getColor(), justifyContent: 'center', alignItems: 'center' }} className='flex object-cover w-full h-full rounded-full text-white'>
          {getInitials(fullName)}
        </div>}
      {src &&
        <img className='object-cover w-full h-full rounded-full' src={src} alt={alt} loading='lazy' />}
      <div className='absolute inset-0 rounded-full shadow-inner' aria-hidden='true' />
    </div>
  )
})
