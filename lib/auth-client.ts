'use client'

import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth'
import { auth } from './firebase'

const googleProvider = new GoogleAuthProvider()
// Optional: googleProvider.setCustomParameters({ prompt: 'select_account' });

export async function signInWithGoogle(): Promise<UserCredential> {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    return result
  } catch (error: any) {
    console.error('Google Sign-In Error:', error.code, error.message)
    throw error // let component handle the error
  }
}
