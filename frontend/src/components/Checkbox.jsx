import React from 'react'

export default function Checkbox({ label, checked, onChange }) {
  return (
    <label style={{ display:'inline-flex', gap:8, alignItems:'center', color:'#374151' }}>
      <input style={{ width:16, height:16 }} type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}
