import { useState } from 'react'
import { signUp, signIn, createUserDoc } from '../firebase.js'

export default function AuthGate({ onAuthenticated }) {
  const [mode, setMode] = useState('login') // 'login' | 'register' | 'pickRole'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingUser, setPendingUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'register') {
        const cred = await signUp(email, password)
        setPendingUser(cred.user)
        setMode('pickRole')
      } else {
        await signIn(email, password)
        // onAuthStateChanged in App will handle the rest
      }
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'Email already in use'
        : err.code === 'auth/invalid-credential' ? 'Invalid email or password'
        : err.code === 'auth/weak-password' ? 'Password must be at least 6 characters'
        : err.code === 'auth/invalid-email' ? 'Invalid email address'
        : err.message
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleSelect = async (role) => {
    setLoading(true)
    setError('')
    try {
      await createUserDoc(pendingUser.uid, pendingUser.email, role)
      onAuthenticated()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (mode === 'pickRole') {
    return (
      <div className="role-gate">
        <div className="role-gate-card">
          <div className="role-gate-logo">StudioPlanner</div>
          <p className="role-gate-sub">Choose your role</p>
          {error && <div className="auth-error">{error}</div>}
          <div className="role-options">
            <button className="role-option" onClick={() => handleRoleSelect('mt')} disabled={loading}>
              <span className="role-icon">🎓</span>
              <div>
                <div className="role-title">Main Teacher</div>
                <div className="role-desc">Build sessions, drag figures &amp; TECs, manage content</div>
              </div>
            </button>
            <button className="role-option role-option-ps" onClick={() => handleRoleSelect('ps')} disabled={loading}>
              <span className="role-icon">📋</span>
              <div>
                <div className="role-title">Practice Supervisor</div>
                <div className="role-desc">View session plan, drill into sections &amp; figures</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="role-gate">
      <div className="role-gate-card">
        <div className="role-gate-logo">StudioPlanner</div>
        <p className="role-gate-sub">Ballroom lesson planning &amp; delivery</p>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />
          </div>
          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? 'Loading…' : mode === 'register' ? 'Create Account' : 'Sign In'}
          </button>
        </form>
        <div className="auth-toggle">
          {mode === 'login' ? (
            <span>No account? <button className="auth-toggle-btn" onClick={() => { setMode('register'); setError('') }}>Register</button></span>
          ) : (
            <span>Have an account? <button className="auth-toggle-btn" onClick={() => { setMode('login'); setError('') }}>Sign In</button></span>
          )}
        </div>
      </div>
    </div>
  )
}
