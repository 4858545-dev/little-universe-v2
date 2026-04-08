import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, onAuthStateChange } from '../lib/supabase'

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
        const { data: { subscription } } = onAuthStateChange((user) => {
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
          })
        })
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
