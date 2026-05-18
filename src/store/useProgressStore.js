import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      completedResources: [],
      coins: 0,
      lastActivity: null,

      markResourceComplete(resourceId) {
        const state = get()
        // Guard: persisted Sets come back as plain objects — normalise to array
        const list = Array.isArray(state.completedResources)
          ? state.completedResources
          : Object.values(state.completedResources)
        console.log('[ProgressStore] markResourceComplete called:', resourceId, '| current list:', list)
        if (list.includes(resourceId)) {
          console.log('[ProgressStore] already complete, skipping')
          return
        }
        set({
          completedResources: [...list, resourceId],
          coins: state.coins + 10,
          lastActivity: Date.now(),
        })
        console.log('[ProgressStore] updated — coins:', state.coins + 10, '| total:', list.length + 1)
      },

      isResourceComplete(resourceId) {
        const list = get().completedResources
        return Array.isArray(list) ? list.includes(resourceId) : false
      },

      getTotalCompleted() {
        const list = get().completedResources
        return Array.isArray(list) ? list.length : 0
      },

      resetProgress() {
        set({ completedResources: [], coins: 0, lastActivity: null })
      },
    }),
    {
      name: 'little-universe-progress',
    }
  )
)

export default useProgressStore
