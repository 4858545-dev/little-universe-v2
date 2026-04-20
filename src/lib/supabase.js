import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Implicit flow so the SDK reads the #access_token hash fragment
    // that Google/Supabase sends back after OAuth redirect.
    // PKCE (the v2 default) uses a ?code= query param which requires a
    // server-side exchange — not suitable for a pure SPA.
    flowType: 'implicit',
    detectSessionInUrl: true,
    persistSession: true,
    autoRefreshToken: true,
  },
})

// ── Auth helpers ─────────────────────────────────────────────

export function signInWithEmail(email, password) {
  return supabase.auth.signInWithPassword({ email, password })
}

export function signUpWithEmail(email, password, metadata = {}) {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  })
}

export function signInWithGoogle() {
  // redirectTo must exactly match a URL listed in Supabase dashboard →
  // Authentication → URL Configuration → Redirect URLs
  // Note: access_type/prompt queryParams are omitted — they cause
  // unexpected_failure on Supabase free tier.
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  })
}

export function signOut() {
  return supabase.auth.signOut()
}

export function getSession() {
  return supabase.auth.getSession()
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session?.user ?? null)
  })
}
