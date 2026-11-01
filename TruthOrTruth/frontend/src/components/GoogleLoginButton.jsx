import React from 'react'
import { authAPI } from '../services/api';
/**
 * Google Sign-In Button using Google Identity Services (GIS).
 *
 * ⚠️  BACKEND STATUS: The backend does NOT currently have an endpoint to
 * verify a Google ID Token. This component renders the Google button and
 * collects the credential but CANNOT complete authentication until the
 * backend adds:
 *
 *   POST /auth/google
 *   Body: { credential: <Google ID Token string> }
 *   The backend should verify the token with Google's API and return a session cookie.
 *
 * Once that endpoint exists:
 *   1. Uncomment authAPI.googleLogin in services/api.js
 *   2. Call it here inside handleGoogleResponse
 *   3. Call auth.login(user) and navigate('/dashboard')
 *
 * HOW TO SET UP:
 *   1. Go to https://console.cloud.google.com/ → APIs & Services → Credentials
 *   2. Create an OAuth 2.0 Client ID (Web Application)
 *   3. Add http://localhost:5173 to Authorized JavaScript origins
 *   4. Copy the Client ID into frontend/.env as VITE_GOOGLE_CLIENT_ID=...
 */
import { useEffect, useRef } from 'react'

export default function GoogleLoginButton({ onSuccess, onError, disabled }) {
  const containerRef = useRef(null)
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  useEffect(() => {
    if (!clientId || clientId === 'your_google_client_id_here') return

    const initializeGSI = () => {
      if (!window.google) return
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      })
      if (containerRef.current) {
        window.google.accounts.id.renderButton(containerRef.current, {
          theme: 'filled_black',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          width: '100%',
        })
      }
    }

    if (window.google) {
      initializeGSI()
    } else {
      // Load the GSI script if not already present
      const existingScript = document.getElementById('google-gsi')
      if (!existingScript) {
        const script = document.createElement('script')
        script.id = 'google-gsi'
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        script.onload = initializeGSI
        document.head.appendChild(script)
      } else {
        existingScript.addEventListener('load', initializeGSI)
      }
    }

    return () => {
      if (window.google) window.google.accounts.id.cancel()
    }
  }, [clientId])

  const handleGoogleResponse = async (response) => {
    // response.credential is the Google ID Token (JWT)
    // ⚠️ Backend does not yet support this – calling onError for now
    console.log('Google response:', response.credential);
  // console.log(
  //   'Google ID Token:',
  //   response.credential
  // );

    // if (onError) {
    //   onError(
    //     'Google login is not yet supported by the backend. ' +
    //     'Add POST /auth/google to verify the ID Token server-side.'
    //   )
    // }

    // FUTURE: When backend is ready, replace the above with:
    try {
      const res = await authAPI.googleLogin(response.credential)
      if (onSuccess) onSuccess(res.data.user)
    } catch (err) {
      if (onError) onError(err.message)
    }
  }

  if (!clientId || clientId === 'your_google_client_id_here') {
    return (
      <button
        type="button"
        className="btn btn-ghost btn-full"
        disabled={disabled}
        onClick={() => onError && onError('Google login is not configured yet. Set VITE_GOOGLE_CLIENT_ID in frontend/.env to enable it.')}
        title="Set VITE_GOOGLE_CLIENT_ID in frontend/.env to enable Google Login"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
    )
  }

  return <div ref={containerRef} style={{ width: '100%' }} />
}
