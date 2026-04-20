import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, getSession, onAuthStateChange } from '../lib/supabase'

// Strip OAuth error/token params from the URL without triggering a reload
function clearOAuthParams() {
  const url = new URL(window.location.href)
  let dirty = false
  // Remove hash fragment (contains access_token, error_code, etc.)
  if (window.location.hash) {
    window.history.replaceState(null, '', url.pathname + url.search)
    dirty = true
  }
  // Remove any OAuth query params
  const oauthParams = ['error', 'error_code', 'error_description', 'code']
  oauthParams.forEach((p) => {
    if (url.searchParams.has(p)) {
      url.searchParams.delete(p)
      dirty = true
    }
  })
  if (dirty) {
    window.history.replaceState(null, '', url.pathname + (url.search !== '?' ? url.search : ''))
  }
}

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      role: null,          // 'specialist' | 'parent'
      isLoading: false,
      isAuthenticated: false,

      // Called once on app mount to sync Supabase session
      initAuth: () => {
        set({ isLoading: true })

        // 1. Subscribe FIRST so we never miss a SIGNED_IN event.
        //    With flowType:'implicit' + detectSessionInUrl:true, the SDK parses the
        //    #access_token hash and fires SIGNED_IN via this listener automatically.
        //    IMPORTANT: do NOT touch the URL hash before this fires — clearing it
        //    earlier strips the token before the SDK can read it.
        const { data: { subscription } } = onAuthStateChange((event, user) => {
          console.log('[auth] onAuthStateChange:', event, user?.email ?? 'no user')
          set({ user, isAuthenticated: !!user, isLoading: false })
          // Only clean up URL params AFTER a confirmed sign-in, never before
          if (event === 'SIGNED_IN' && user) clearOAuthParams()
        })

        // 2. Delayed getSession() as a fallback for returning users with a persisted
        //    session (no hash in the URL for those). 100ms lets the SDK finish parsing
        //    any hash fragment first, so getSession() sees the exchanged session.
        setTimeout(() => {
          getSession().then(({ data: { session }, error }) => {
            if (error) {
              console.error('[auth] getSession error:', error)
              set({ isLoading: false })
              return
            }
            if (session?.user) {
              console.log('[auth] getSession: session found', session.user.email)
              set({ user: session.user, isAuthenticated: true, isLoading: false })
            } else {
              console.log('[auth] getSession: no session')
              set({ isLoading: false })
            }
          })
        }, 100)

        return () => subscription.unsubscribe()
      },

      login: async (email, password) => {
        set({ isLoading: true })
        const { data, error } = await signInWithEmail(email, password)
        if (error) {
          set({ isLoading: false })
          throw error
        }
        set({ user: data.user, isAuthenticated: true, isLoading: false })
      },

      register: async (email, password, role) => {
        set({ isLoading: true })
        const { data, error } = await signUpWithEmail(email, password, { role })
        if (error) {
          set({ isLoading: false })
          throw error
        }
        set({ user: data.user, role, isAuthenticated: !!data.user, isLoading: false })
      },

      loginWithGoogle: async () => {
        set({ isLoading: true })
        const { error } = await signInWithGoogle()
        if (error) {
          set({ isLoading: false })
          throw error
        }
        // Auth state update handled by onAuthStateChange
      },

      logout: async () => {
        await signOut()
        set({ user: null, role: null, isAuthenticated: false })
      },

      setRole: (role) => set({ role }),
    }),
    {
      name: 'little-universe-auth',
      partialize: (s) => ({
        user: s.user,
        role: s.role,
        isAuthenticated: s.isAuthenticated,
      }),
    }
  )
)

export default useAuthStore
