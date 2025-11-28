import React from 'react'
import cls from 'classnames'

export default function Button({ children, variant = 'primary', type = 'button', onClick, className, disabled }) {
  const base = { display:'inline-flex', justifyContent:'center', alignItems:'center', width:'100%', padding:'12px 16px', fontWeight:600, borderRadius:12, border:'none', cursor:'pointer', transition:'transform .02s ease, box-shadow .2s ease' }
  const primary = { background:'#3f5d2a', color:'#fff', boxShadow:'0 6px 14px rgba(63,93,42,0.25)' }
  const ghost = { background:'#fff', color:'#0f172a', border:'1px solid #e5e7eb' }
  const style = { ...base, ...(variant === 'ghost' ? ghost : primary) }
  return (
    <button style={style} className={cls(className)} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
