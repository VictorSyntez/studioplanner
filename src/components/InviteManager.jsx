import { useState, useEffect } from 'react'
import { sendInvite, acceptInvite, subscribeInvitesSent, subscribeInvitesReceived } from '../firebase.js'

export default function InviteManager({ user, userDoc, onLinked }) {
  const [psEmail, setPsEmail] = useState('')
  const [invites, setInvites] = useState([])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const isMT = userDoc?.role === 'mt'

  useEffect(() => {
    if (!user) return
    const unsub = isMT
      ? subscribeInvitesSent(user.uid, setInvites)
      : subscribeInvitesReceived(user.email, setInvites)
    return unsub
  }, [user, isMT])

  const handleSendInvite = async (e) => {
    e.preventDefault()
    if (!psEmail.trim()) return
    setSending(true)
    setError('')
    try {
      await sendInvite(user.uid, user.email, psEmail.trim())
      setPsEmail('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  const handleAccept = async (invite) => {
    try {
      await acceptInvite(invite.id, user.uid, invite.mtId)
      if (onLinked) onLinked(invite.mtId)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="invite-manager">
      <div className="invite-header">
        {isMT ? 'Invite Practice Supervisor' : 'Pending Invitations'}
      </div>

      {error && <div className="auth-error" style={{ marginBottom: 10 }}>{error}</div>}

      {isMT && (
        <form className="invite-form" onSubmit={handleSendInvite}>
          <input
            className="form-input"
            type="email"
            placeholder="PS email address"
            value={psEmail}
            onChange={e => setPsEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary btn-sm" type="submit" disabled={sending}>
            {sending ? '…' : 'Invite'}
          </button>
        </form>
      )}

      {invites.length > 0 && (
        <div className="invite-list">
          {invites.map(inv => (
            <div key={inv.id} className="invite-item">
              <div className="invite-item-info">
                <span className="invite-item-email">{isMT ? inv.psEmail : inv.mtEmail}</span>
                <span className="invite-item-status">{inv.status}</span>
              </div>
              {!isMT && inv.status === 'pending' && (
                <button className="btn btn-primary btn-sm" onClick={() => handleAccept(inv)}>
                  Accept
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {invites.length === 0 && (
        <div className="invite-empty">
          {isMT ? 'No pending invites sent' : 'No pending invitations'}
        </div>
      )}

      {!isMT && userDoc?.linkedMtId && (
        <div className="invite-linked">
          Linked to teacher account
        </div>
      )}
    </div>
  )
}
