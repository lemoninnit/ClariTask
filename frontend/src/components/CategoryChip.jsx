import React from 'react'
import styles from './CategoryChip.module.css'

export default function CategoryChip({ name }) {
  return <span className={styles.chip}>{name}</span>
}