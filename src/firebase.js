import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged as fbOnAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
  writeBatch,
  getDocs,
  updateDoc,
  serverTimestamp,
  orderBy,
} from 'firebase/firestore'

// ─── Firebase config ────────────────────────────────
// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// ─── Auth helpers ───────────────────────────────────
export async function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}

export async function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export async function signOut() {
  return fbSignOut(auth)
}

export function onAuthStateChanged(cb) {
  return fbOnAuthStateChanged(auth, cb)
}

// ─── User doc helpers ───────────────────────────────
export async function createUserDoc(userId, email, role) {
  await setDoc(doc(db, 'users', userId), {
    email,
    displayName: email.split('@')[0],
    role,
    createdAt: serverTimestamp(),
    ...(role === 'ps' ? { linkedMtId: null } : {}),
  })
}

export async function getUserDoc(userId) {
  const snap = await getDoc(doc(db, 'users', userId))
  return snap.exists() ? snap.data() : null
}

// ─── Sessions helpers ───────────────────────────────
export async function saveSessions(mtUserId, sessions) {
  const batch = writeBatch(db)
  const colRef = collection(db, 'users', mtUserId, 'sessions')

  // Get existing session IDs to delete removed ones
  const existing = await getDocs(colRef)
  const existingIds = new Set(existing.docs.map(d => d.id))
  const newIds = new Set(sessions.map(s => s.id))

  // Delete sessions that no longer exist
  for (const id of existingIds) {
    if (!newIds.has(id)) {
      batch.delete(doc(colRef, id))
    }
  }

  // Upsert current sessions
  for (const session of sessions) {
    batch.set(doc(colRef, session.id), session)
  }

  await batch.commit()
}

export function subscribeSessions(mtUserId, callback) {
  const colRef = collection(db, 'users', mtUserId, 'sessions')
  return onSnapshot(colRef, (snap) => {
    const sessions = snap.docs.map(d => d.data())
    // Sort by date descending
    sessions.sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    callback(sessions)
  })
}

// ─── Invite helpers ─────────────────────────────────
export async function sendInvite(mtId, mtEmail, psEmail) {
  const inviteRef = doc(collection(db, 'invites'))
  await setDoc(inviteRef, {
    mtId,
    mtEmail,
    psEmail: psEmail.toLowerCase(),
    status: 'pending',
    createdAt: serverTimestamp(),
  })
  return inviteRef.id
}

export async function acceptInvite(inviteId, psUserId, mtId) {
  // Update invite status
  await updateDoc(doc(db, 'invites', inviteId), { status: 'accepted' })
  // Link PS to MT
  await updateDoc(doc(db, 'users', psUserId), { linkedMtId: mtId })
}

export function subscribeInvitesSent(mtId, callback) {
  const q = query(
    collection(db, 'invites'),
    where('mtId', '==', mtId),
    where('status', '==', 'pending')
  )
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}

export function subscribeInvitesReceived(psEmail, callback) {
  const q = query(
    collection(db, 'invites'),
    where('psEmail', '==', psEmail.toLowerCase()),
    where('status', '==', 'pending')
  )
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })))
  })
}
