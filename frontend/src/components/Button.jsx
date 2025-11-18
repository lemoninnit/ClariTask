import React from 'react'
import styles from './Button.module.css'
import cls from 'classnames'

export default function Button({ children, variant = 'primary', type = 'button', onClick }) {
  return (
    <button className={cls(styles.btn, styles[variant])} type={type} onClick={onClick}>
      {children}
    </button>
  )
}