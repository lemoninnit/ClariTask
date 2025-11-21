import React from 'react'
import styles from './TextField.module.css'

export default function TextField({ label, type = 'text', placeholder, value, onChange, rightAction, required = true, className, inputClassName }) {
  return (
    <label className={`${styles.field} ${className || ''}`}>
      <div className={styles.row}>
        <span className={styles.label}>{label}</span>
        {rightAction && <span className={styles.rightAction}>{rightAction}</span>}
      </div>
      <input
        className={`${styles.input} ${inputClassName || ''}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </label>
  )
}