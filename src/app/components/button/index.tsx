'use client'

import styles from './button.module.scss'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  onClick: () => void
  variant: 'primary' | 'secondary' | 'destructive'
}

export function Button({ onClick, variant, children }: ButtonProps) {
  function handleGetClassName(variant: ButtonProps['variant']) {
    switch (variant) {
      case 'primary':
        return styles.primary
      case 'destructive':
        return styles.destructive
      default:
        return styles.secondary
    }
  }
  return (
    <button onClick={onClick} className={handleGetClassName(variant)}>
      {children}
    </button>
  )
}
