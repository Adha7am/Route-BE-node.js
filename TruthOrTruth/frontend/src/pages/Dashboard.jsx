import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../App.jsx'
import { productAPI } from '../services/api.js'
import AppShell from '../components/AppShell.jsx'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ products: 0 })
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    productAPI
      .getAll(1, 100)
      .then((res) => setStats({ products: res.data.result?.products?.length ?? 0 }))
      .catch(() => {})
      .finally(() => setLoadingStats(false))
  }, [])

  const initials = user
    ? `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
    : '?'

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <AppShell title="Dashboard">
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,.18) 0%, rgba(6,182,212,.12) 100%)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-8)',
          marginBottom: 'var(--sp-8)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--sp-5)',
        }}
      >
        <div
          style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: 'var(--c-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 700, color: '#fff',
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <p style={{ color: 'var(--c-text-2)', fontSize: 'var(--fs-sm)', marginBottom: '0.25rem' }}>
            {greeting} 👋
          </p>
          <h2 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 700, letterSpacing: '-0.03em' }}>
            {user?.firstName} {user?.lastName}
          </h2>
          <p style={{ color: 'var(--c-text-3)', fontSize: 'var(--fs-sm)', marginTop: '0.25rem' }}>
            {user?.email}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <StatCard
          label="Total Products"
          value={loadingStats ? '—' : stats.products}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
          }
          color="rgba(99,102,241,.15)"
          iconColor="var(--c-primary)"
        />
        <StatCard
          label="Account Age (days)"
          value={
            user?.createdAt
              ? Math.floor((Date.now() - new Date(user.createdAt)) / 86400000)
              : '—'
          }
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
          }
          color="rgba(6,182,212,.12)"
          iconColor="var(--c-accent)"
        />
        <StatCard
          label="Age"
          value={user?.age ? `${user.age} yrs` : '—'}
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          }
          color="rgba(16,185,129,.12)"
          iconColor="var(--c-success)"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 600, marginBottom: 'var(--sp-4)' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
            </svg>
            Browse Products
          </Link>
        </div>
      </div>

      {/* Profile Info Card */}
      <div
        style={{
          marginTop: 'var(--sp-8)',
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-6)',
        }}
      >
        <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 600, marginBottom: 'var(--sp-5)' }}>
          Profile Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--sp-4)' }}>
          {[
            { label: 'First Name', value: user?.firstName },
            { label: 'Last Name', value: user?.lastName },
            { label: 'Email', value: user?.email },
            { label: 'Age', value: user?.age },
          ].map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-text-3)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {label}
              </p>
              <p style={{ fontWeight: 500 }}>{value ?? '—'}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}

function StatCard({ label, value, icon, color, iconColor }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color, color: iconColor }}>
        {icon}
      </div>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  )
}
