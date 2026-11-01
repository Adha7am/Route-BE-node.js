import React from 'react'
import { authAPI } from '../services/api';

/**
 * Facebook Login Button using the Facebook JavaScript SDK.
 *
 * ⚠️  BACKEND STATUS: The backend does NOT currently have an endpoint to
 * verify a Facebook access token. This component renders the Facebook button and
 * collects the access token but CANNOT complete authentication until the
 * backend adds:
 *
 *   POST /auth/facebook
 *   Body: { accessToken: <Facebook Access Token string> }
 *   The backend should verify the token with Facebook's Graph API and return a session cookie.
 *
 * Once that endpoint exists:
 *   1. Uncomment authAPI.facebookLogin in services/api.js
 *   2. Call it here inside handleFacebookResponse
 *   3. Call auth.login(user) and navigate('/dashboard')
 *
 * HOW TO SET UP:
 *   1. Go to https://developers.facebook.com/ → My Apps → Create App
 *   2. Add "Facebook Login" product and configure Web platform
 *   3. Add http://localhost:5173 to Valid OAuth Redirect URIs
 *   4. Copy the App ID into frontend/.env as VITE_FACEBOOK_APP_ID=...
 */
import { useEffect } from 'react'

export default function FacebookLoginButton({ onSuccess, onError, disabled }) {
  const appId = import.meta.env.VITE_FACEBOOK_APP_ID

  useEffect(() => {
    if (!appId ) return

    const initializeFB = () => {
      window.FB.init({
        appId,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      })
    }

    if (window.FB) {
      initializeFB()
    } else {
      window.fbAsyncInit = initializeFB
      const existingScript = document.getElementById('facebook-jssdk')
      if (!existingScript) {
        const script = document.createElement('script')
        script.id = 'facebook-jssdk'
        script.src = 'https://connect.facebook.net/en_US/sdk.js'
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    }
  }, [appId])

  const handleFacebookLogin = () => {
    if (!window.FB) {
      if (onError) onError('Facebook SDK is not loaded yet. Please try again.')
      return
    }

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          handleFacebookResponse(response.authResponse)
        } else {
          if (onError) onError('Facebook login was cancelled or failed.')
        }
      },
      { scope: 'public_profile,email' }
    )
  }

  
const handleFacebookResponse = async (authResponse) => {
  try {
    const res = await authAPI.facebookLogin(
      authResponse.accessToken
    );
    console.log(res);
    
    onSuccess?.(res.data.user);
  } catch (err) {
    onError?.(
      err.response?.data?.message ||
      err.message ||
      'Facebook login failed'
    );
  }
};

  if (!appId || appId === 'your_facebook_app_id_here') {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-full"
      disabled
      title="Set VITE_FACEBOOK_APP_ID in frontend/.env to enable Facebook Login"
    >
      Continue with Facebook (configure App ID)
    </button>
  );
}

  return (
    <button
      type="button"
      className="btn btn-ghost btn-full"
      onClick={handleFacebookLogin}
      disabled={disabled}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="#1877F2">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
      </svg>
      Continue with Facebook
    </button>
  )
}

