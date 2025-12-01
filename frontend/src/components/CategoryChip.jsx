import React from 'react'
import styles from './CategoryChip.module.css'

export default function CategoryChip({ name, active = false, onClick }) {
  const css = styles || {}
  const base = css.chip || ''
  const style = {
    cursor: 'pointer',
    background: active ? '#3f5d2a' : '#e8f2e6',
    color: active ? '#ffffff' : '#2d4a1b',
  }
  return (
    <span className={base} style={style} onClick={onClick}>
      {name}
    </span>
  )
}
