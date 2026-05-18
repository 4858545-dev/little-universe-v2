import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgressStore = create(
  persist(
    (set, get) => ({
      completedResources: [],
      coins: 0,
      lastActivity: null,

      markResourceComplete(resourceId) {
        const { completedResources } = get()
        if (completedResources.includes(resourceId)) return
        set({
          completedResources: [...completedResources, resourceId],
          coins: get().coins + 10,
          lastActivity: Date.now(),
        })
      },

      isResourceComplete(resourceId) {
        return get().completedResources.includes(resourceId)
      },

      getTotalCompleted() {
        return get().completedResources.length
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
