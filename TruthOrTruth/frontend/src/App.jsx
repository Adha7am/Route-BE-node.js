import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { authAPI } from './services/api.js'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'

// ─── Auth Context ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

// ─── Protected Route ──────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="app-loading"><div className="spinner lg" /></div>
  return user ? children : <Navigate to="/login" replace />
}

// ─── Public Route (redirect if already logged in) ────────────────────────────
function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="app-loading"><div className="spinner lg" /></div>
  return !user ? children : <Navigate to="/dashboard" replace />
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Verify session on mount by hitting the profile endpoint
  // The backend uses an HTTP-only cookie, so we just check if the request succeeds
  const checkAuth = useCallback(async () => {
    try {
      const res = await authAPI.getProfile()
      setUser(res.data.user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = (userData) => setUser(userData)

  const logout = async () => {
    // The backend does not currently expose a /auth/logout endpoint.
    // Clearing the session requires the server to clear the httpOnly cookie.
    // For now we clear local state; the cookie will expire after 1h (maxAge from backend).
    // TODO: Add POST /auth/logout to the backend to properly clear the cookie server-side.
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthContext.Provider>
  )
}
