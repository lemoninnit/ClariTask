import React, { useEffect, useState } from 'react'
import Card from './Card'
import { getAnnouncements } from '../api/announcements'

export default function AnnouncementCard() {
  const [items, setItems] = useState([])
  useEffect(()=>{ (async()=>{ try { setItems(await getAnnouncements()) } catch { setItems([]) } })() },[])
  return (
    <Card title="Announcement">
      {items.length === 0 ? (
        <div style={{ color:'#64748b' }}>Nothing so far...</div>
      ) : (
        <div style={{ display:'grid', gap:8 }}>
          {items.map(a => (
            <div key={a.announcementId} style={{ padding:12, border:'1px solid #e5e7eb', borderRadius:8 }}>
              <div style={{ fontWeight:700 }}>{a.title}</div>
              <div style={{ color:'#64748b' }}>{a.content}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
