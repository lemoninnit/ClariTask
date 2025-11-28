import React from 'react'
import styles from './CategoryChip.module.css'

export default function CategoryChip({ name }) {
  const css = styles || {}
  return <span className={css.chip || ''}>{name}</span>
}
