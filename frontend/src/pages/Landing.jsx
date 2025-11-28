import React from 'react'
import SiteLayout from '../layouts/SiteLayout'
import Button from '../components/Button'
import Card from '../components/Card'

export default function Landing() {
  const s = {
    hero: { display:'flex', alignItems:'center', justifyContent:'center', padding:'100px 20px', background:'radial-gradient(80% 120% at 50% 0%, #f3f4f6 0%, #ffffff 100%)' },
    container: { textAlign:'center', maxWidth:900, margin:'0 auto' },
    title: { fontSize:56, fontWeight:800, margin:'0 0 12px', letterSpacing:'-0.02em', color:'#0f172a' },
    subtitle: { color:'#6b7280', fontSize:20, margin:'0 auto', maxWidth:720 },
    ctaRow: { display:'inline-grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:24 },
    cta: { display:'block' },
    features: { padding:'40px 20px' },
    grid: { maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:16 },
    feature: { background:'#fff', border:'1px solid #e5e7eb', borderRadius:12, padding:16 },
    fTitle: { fontWeight:700, color:'#0f172a', marginBottom:6 },
    fDesc: { color:'#6b7280' },
  }
  return (
    <SiteLayout>
      <section style={s.hero}>
        <div style={s.container}>
          <Card>
            <h1 style={s.title}>Organize Tasks Clearly</h1>
            <p style={s.subtitle}>Manage assignments, track deadlines, and stay informed with a simple, fast, and reliable experience.</p>
            <div style={s.ctaRow}>
              <a href="/signup" style={s.cta}><Button>Get Started</Button></a>
              <a href="/login" style={s.cta}><Button variant="ghost">Sign In</Button></a>
            </div>
          </Card>
        </div>
      </section>
      <section style={s.features}>
        <div style={s.grid}>
          <div style={s.feature}><div style={s.fTitle}>Task Management</div><div style={s.fDesc}>Create, edit, and track tasks with status and due dates.</div></div>
          <div style={s.feature}><div style={s.fTitle}>Announcements</div><div style={s.fDesc}>Teachers post updates visible to students instantly.</div></div>
          <div style={s.feature}><div style={s.fTitle}>Search & Filter</div><div style={s.fDesc}>Find the right task or announcement quickly.</div></div>
          <div style={s.feature}><div style={s.fTitle}>Notifications</div><div style={s.fDesc}>Get notified before deadlines and on new posts.</div></div>
          <div style={s.feature}><div style={s.fTitle}>Responsive Design</div><div style={s.fDesc}>Beautiful on desktops, tablets, and mobile devices.</div></div>
          <div style={s.feature}><div style={s.fTitle}>Secure Storage</div><div style={s.fDesc}>Backed by a reliable database for smooth operations.</div></div>
        </div>
      </section>
    </SiteLayout>
  )
}
