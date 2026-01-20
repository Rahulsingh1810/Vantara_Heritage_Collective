// Usage: Call this util after Google sign-in on the frontend
// Pass the Firebase ID token to this function to authenticate/register with your backend

export async function firebaseLogin(idToken: string) {
  const res = await fetch("/api/auth/firebase-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });
  if (!res.ok) {
    throw new Error("Failed to login/register with Firebase");
  }
  return res.json();
}
