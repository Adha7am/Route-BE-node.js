import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api.js'
import FormField from '../components/FormField.jsx'
import Alert from '../components/Alert.jsx'

/**
 * Registration form.
 *
 * Backend constraints (from user.model.js):
 *  - firstName: String, required, 2–40 chars
 *  - lastName:  String, required, 2–40 chars
 *  - email:     String, required, unique, must end with @gmail.com
 *  - password:  String, required, min 6 chars
 *  - age:       Number, required, min 18
 *
 * POST /auth/signup returns the created user document (201).
 */
export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: '', age: '',
  })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.firstName.trim() || form.firstName.trim().length < 2) e.firstName = 'First name must be at least 2 characters'
    if (!form.lastName.trim() || form.lastName.trim().length < 2) e.lastName = 'Last name must be at least 2 characters'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!form.email.endsWith('@gmail.com')) e.email = 'Email must be a @gmail.com address (backend requirement)'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.confirmPassword !== form.password) e.confirmPassword = 'Passwords do not match'
    const age = Number(form.age)
    if (!form.age) e.age = 'Age is required'
    else if (isNaN(age) || age < 18) e.age = 'You must be at least 18 years old'
    return e
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: '' }))
    setApiError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setApiError('')
    try {
      await authAPI.signup({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        age: Number(form.age),
      })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const iconEmail = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
  const iconLock = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  )
  const iconUser = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
  const iconAge = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  )

  const pwToggle = (
    <button type="button" className="btn-icon" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? 'Hide' : 'Show'}>
      {showPw
        ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
        : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      }
    </button>
  )

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span className="auth-logo-name">Sara7a</span>
        </div>

        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Fill in the details below to get started</p>

        {success && (
          <Alert type="success">
            Account created! Redirecting you to login…
          </Alert>
        )}
        {apiError && <Alert type="error">{apiError}</Alert>}

        {!success && (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-row">
                <FormField label="First name" id="firstName" name="firstName" type="text"
                  placeholder="John" autoComplete="given-name"
                  value={form.firstName} onChange={handleChange} error={errors.firstName}
                  icon={iconUser}
                />
                <FormField label="Last name" id="lastName" name="lastName" type="text"
                  placeholder="Doe" autoComplete="family-name"
                  value={form.lastName} onChange={handleChange} error={errors.lastName}
                  icon={iconUser}
                />
              </div>

              <FormField label="Email address" id="email" name="email" type="email"
                placeholder="name@gmail.com" autoComplete="email"
                value={form.email} onChange={handleChange} error={errors.email}
                icon={iconEmail}
              />

              <FormField label="Age" id="age" name="age" type="number" min="18"
                placeholder="Must be 18 or older"
                value={form.age} onChange={handleChange} error={errors.age}
                icon={iconAge}
              />

              <FormField label="Password" id="password" name="password"
                type={showPw ? 'text' : 'password'} autoComplete="new-password"
                placeholder="Minimum 6 characters"
                value={form.password} onChange={handleChange} error={errors.password}
                icon={iconLock} rightElement={pwToggle}
              />

              <FormField label="Confirm password" id="confirmPassword" name="confirmPassword"
                type={showPw ? 'text' : 'password'} autoComplete="new-password"
                placeholder="Re-enter your password"
                value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword}
                icon={iconLock}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
