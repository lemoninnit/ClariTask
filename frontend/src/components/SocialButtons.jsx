import React from 'react'
import Button from './Button'
import styles from './SocialButtons.module.css'

export default function SocialButtons() {
  return (
    <div className={styles.row}>
      <Button variant="ghost">Sign in with Google</Button>
      <Button variant="ghost">Sign in with Apple</Button>
    </div>
  )
}