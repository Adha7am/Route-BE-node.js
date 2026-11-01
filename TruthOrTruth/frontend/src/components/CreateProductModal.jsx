import React, { useState } from 'react'
import { productAPI } from '../services/api.js'
import FormField from './FormField.jsx'
import Alert from './Alert.jsx'

/**
 * Modal dialog for creating a new product.
 * Requires the user to be authenticated (cookie must be present).
 */
export default function CreateProductModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ name: '', description: '', price: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Name must be at least 2 characters'
    if (!form.description.trim() || form.description.trim().length < 2) e.description = 'Description must be at least 2 characters'
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = 'Price must be a positive number'
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
    try {
      await productAPI.create({ ...form, price: Number(form.price) })
      onCreated()
      onClose()
    } catch (err) {
      setApiError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 className="modal-title" id="modal-title">Add New Product</h2>

        {apiError && <Alert type="error">{apiError}</Alert>}

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <FormField
              label="Product Name"
              id="prod-name"
              name="name"
              type="text"
              placeholder="e.g. Wireless Headphones"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
              noIcon
            />
            <FormField
              label="Description"
              id="prod-desc"
              name="description"
              type="text"
              placeholder="Short description (2–40 chars)"
              value={form.description}
              onChange={handleChange}
              error={errors.description}
              noIcon
            />
            <FormField
              label="Price ($)"
              id="prod-price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="e.g. 49.99"
              value={form.price}
              onChange={handleChange}
              error={errors.price}
              noIcon
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading && <span className="spinner" />}
              {loading ? 'Creating…' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
