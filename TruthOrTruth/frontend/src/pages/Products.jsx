import React, { useEffect, useState, useCallback } from 'react'
import { useAuth } from '../App.jsx'
import { productAPI } from '../services/api.js'
import AppShell from '../components/AppShell.jsx'
import Alert from '../components/Alert.jsx'
import CreateProductModal from '../components/CreateProductModal.jsx'

const LIMIT = 6

export default function Products() {
  const { user } = useAuth()

  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  const fetchProducts = useCallback(async (p) => {
    setLoading(true)
    setError('')
    try {
      const res = await productAPI.getAll(p, LIMIT)
      const { products: fetched } = res.data.result
      setProducts(fetched)
      setHasMore(fetched.length === LIMIT)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProducts(page)
  }, [page, fetchProducts])

  const handlePrev = () => setPage((p) => Math.max(1, p - 1))
  const handleNext = () => { if (hasMore) setPage((p) => p + 1) }

  const handleCreated = () => {
    setPage(1)
    fetchProducts(1)
  }

  const content = (
    <>
      {error && <Alert type="error">{error}</Alert>}

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
          <div className="spinner dark lg" />
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <h3>No products yet</h3>
          <p>
            {user
              ? 'Click "Add Product" to create the first one.'
              : 'Sign in to add products.'}
          </p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="btn btn-ghost btn-sm"
              onClick={handlePrev}
              disabled={page === 1 || loading}
            >
              ← Previous
            </button>
            <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-text-2)', padding: '0 0.5rem' }}>
              Page {page}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleNext}
              disabled={!hasMore || loading}
            >
              Next →
            </button>
          </div>
        </>
      )}

      {showModal && (
        <CreateProductModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  )

  // If user is authenticated show with sidebar shell, otherwise as a standalone page
  if (user) {
    return (
      <AppShell
        title="Products"
        actions={
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowModal(true)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Product
          </button>
        }
      >
        {content}
      </AppShell>
    )
  }

  // Public view (not logged in)
  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
      <header style={{
        padding: '1.25rem 2rem',
        borderBottom: '1px solid var(--c-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--c-surface)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 32, height: 32,
            borderRadius: '6px',
            background: 'rgba(99,102,241,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--c-primary)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Sara7a</span>
        </div>
        <a href="/login" className="btn btn-primary btn-sm">Sign In</a>
      </header>
      <div style={{ padding: '2rem' }}>
        <div className="section-header">
          <div>
            <h1 className="section-title">All Products</h1>
            <p className="section-subtitle">Browse the product catalogue</p>
          </div>
        </div>
        {content}
      </div>
    </div>
  )
}

function ProductCard({ product }) {
  const { name, description, price, createdBy } = product
  const creator = typeof createdBy === 'object'
    ? `${createdBy.firstName ?? ''} ${createdBy.lastName ?? ''}`.trim()
    : ''

  return (
    <div className="product-card">
      <span className="product-badge">Product</span>
      <h3 className="product-name">{name}</h3>
      <p className="product-desc">{description}</p>
      <div className="product-footer">
        <span className="product-price">${Number(price).toFixed(2)}</span>
        {creator && <span className="product-creator">by {creator}</span>}
      </div>
    </div>
  )
}
