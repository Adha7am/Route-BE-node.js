import React from 'react'

/**
 * Reusable form input with icon, label, and error message.
 */
export default function FormField({
  label,
  id,
  error,
  icon,
  rightElement,
  className = '',
  noIcon = false,
  ...inputProps
}) {
  return (
    <div className="form-group" style={{ marginBottom: 0 }}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="input-wrap">
        {!noIcon && icon && (
          <span className="input-icon">{icon}</span>
        )}
        <input
          id={id}
          className={`form-input ${noIcon ? 'no-icon' : ''} ${rightElement ? 'has-suffix' : ''} ${error ? 'error-state' : ''} ${className}`}
          {...inputProps}
        />
        {rightElement && (
          <span className="input-suffix">{rightElement}</span>
        )}
      </div>
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}
