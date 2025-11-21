import React from 'react'
import styles from './Button.module.css'
import cls from 'classnames'

export default function Button({ children, variant = 'primary', type = 'button', onClick, className, disabled }) {
  return (
    <button className={cls(styles.btn, styles[variant], className)} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}