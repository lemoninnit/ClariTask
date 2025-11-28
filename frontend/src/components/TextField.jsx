import React from 'react'
 

export default function TextField({ label, type = 'text', placeholder, value, onChange, rightAction, required = true, className, inputClassName, suffix }) {
  const s = {
    field: { display:'block' },
    row: { display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:6 },
    label: { fontWeight:600, color:'#0f172a' },
    rightAction: { fontSize:14, color:'#5f7a4b', cursor:'pointer' },
    inputWrap: { position:'relative' },
    input: { width:'100%', padding:'12px 14px', border:'1px solid #e5e7eb', borderRadius:10, outline:'none', background:'#fff' },
    suffix: { position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', color:'#64748b', display:'flex', alignItems:'center', justifyContent:'center' },
  }
  return (
    <label style={{ ...s.field, ...(className ? {} : {}) }}>
      <div style={s.row}>
        <span style={s.label}>{label}</span>
        {rightAction && <span style={s.rightAction}>{rightAction}</span>}
      </div>
      <div style={s.inputWrap}>
        <input
          style={{ ...s.input }}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={inputClassName}
        />
        {suffix && <span style={s.suffix}>{suffix}</span>}
      </div>
    </label>
  )
}
