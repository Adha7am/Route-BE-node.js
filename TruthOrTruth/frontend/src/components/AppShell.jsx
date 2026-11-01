import React from 'react'
import Sidebar from './Sidebar.jsx'

/**
 * Authenticated app shell: sidebar + top bar + page content
 */
export default function AppShell({ title, actions, children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <header className="topbar">
          <span className="topbar-title">{title}</span>
          {actions && <div className="topbar-actions">{actions}</div>}
        </header>
        <main className="page-content">{children}</main>
      </div>
    </div>
  )
}
