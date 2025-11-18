import React from 'react'
import styles from './Checkbox.module.css'

export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}