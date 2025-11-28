import React from 'react'
import Card from './Card'
import CategoryChip from './CategoryChip'
import Button from './Button'

export default function CategoriesCard({ categories=[], newCat, setNewCat, onAdd }) {
  return (
    <Card title="Categories" right={<span style={{ background:'#f1f5f9', color:'#475569', padding:'4px 12px', borderRadius:12, fontSize:14, fontWeight:600 }}>{categories.length}</span>}>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:12, minHeight:0 }}>
        {categories.length === 0 ? (
          <div style={{ width:'100%', textAlign:'center', padding:24, color:'#94a3b8', fontSize:14 }}>No categories yet. Add one below!</div>
        ) : (
          categories.map(c => (<CategoryChip key={c.categoryId || c.name} name={c.name} />))
        )}
      </div>
      <form onSubmit={onAdd} style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:10 }}>
        <input value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="New category name" style={{ width:'100%', padding:'10px 12px', border:'1px solid #e5e7eb', borderRadius:8, fontSize:14 }} />
        <Button type="submit" className="">Add</Button>
      </form>
    </Card>
  )
}
