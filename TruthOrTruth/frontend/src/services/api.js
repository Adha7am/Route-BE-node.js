/**
 * Centralized API Service
 *
 * Backend base: http://localhost:3000 (proxied to same origin via Vite in dev)
 * Authentication: HTTP-only cookie "accessToken" set by POST /auth/login
 * All requests use credentials: "include" so cookies are sent automatically.
 *
 * Confirmed endpoints (from backend source inspection):
 *
 *  AUTH
 *    POST /auth/signup   body: { firstName, lastName, email, password, age }
 *                        note: email MUST end with @gmail.com (backend validator)
 *                        response: the created user document (201)
 *
 *    POST /auth/login    body: { email, password }
 *                        response: 200 + sets httpOnly cookie "accessToken" (1h TTL)
 *                        response body: "loggedIn successgully" (string, note typo in backend)
 *
 *  USERS
 *    GET  /user/profile  requires cookie auth
 *                        response: { message, user: { firstName, lastName, email, age, ... } }
 *
 *    GET  /user/allusers no auth required (backend code has a bug with .toArray() – may error)
 *    PATCH /user/update/:id no auth – body: user fields (backend has bugs, avoid for now)
 *
 *  PRODUCTS
 *    GET  /product/all?page=1&limit=6  public, paginated
 *                        response: { success, message, result: { products, page, limit } }
 *                        products have: { _id, name, description, price, createdBy: { firstName, email, lastName }, timestamps }
 *
 *    POST /product/create  requires cookie auth
 *                          body: { name, description, price }  (createdBy injected from token)
 *                          response: { success, message, result }
 *
 *    PATCH /product/update/:id  requires cookie auth (actually deletes product – backend bug)
 *
 *  GOOGLE LOGIN
 *    No /auth/google-token or equivalent endpoint exists in the backend.
 *    The frontend renders a Google Sign-In button but cannot complete server-side
 *    verification until the backend adds an endpoint such as:
 *      POST /auth/google  body: { credential: <Google ID Token> }
 *    See GoogleLoginButton.jsx for the frontend implementation stub.
 */

import axios from 'axios'

// In development Vite proxies /auth, /user, /product to localhost:3000
// In production set VITE_API_URL to your deployed backend URL
const BASE_URL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,      // sends the httpOnly accessToken cookie automatically
  headers: {
    'Content-Type': 'application/json',
  },
})

// ─── Response interceptor ─────────────────────────────────────────────────────
// Normalise error messages from the Express error handler shape:
// { success: false, message: string, stack: string }
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      error?.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(typeof message === 'string' ? message : JSON.stringify(message)))
  }
)

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  /**
   * POST /auth/signup
   * @param {{ firstName: string, lastName: string, email: string, password: string, age: number }} data
   * Note: email must end with @gmail.com
   */
  signup: (data) => api.post('/auth/register', data),

  /**
   * POST /auth/login
   * @param {{ email: string, password: string }} data
   * On success the backend sets httpOnly cookie "accessToken"
   */
  login: (data) => api.post('/auth/login', data),

  /**
   * GET /user/profile
   * Requires the accessToken cookie – used to verify active session
   */
  getProfile: () => api.get('/user/profile'),

  /**
   * Google ID Token login
   * ⚠️  NOT YET IMPLEMENTED ON BACKEND
   * The backend has no endpoint to verify a Google ID Token.
   * When you add POST /auth/google to the backend, uncomment this:
   **/
   googleLogin: (credential) => api.post('/auth/google', { credential }),
   
   facebookLogin: (accessToken) =>
    api.post("/auth/facebook", { accessToken })
   
}

// ─── Products ─────────────────────────────────────────────────────────────────
export const productAPI = {
  /**
   * GET /product/all?page=1&limit=6
   * Public endpoint – no auth required
   */
  getAll: (page = 1, limit = 6) =>
    api.get('/product/all', { params: { page, limit } }),

  /**
   * POST /product/create
   * Requires cookie auth
   * @param {{ name: string, description: string, price: number }} data
   */
  create: (data) => api.post('/product/create', data),
}

export default api
