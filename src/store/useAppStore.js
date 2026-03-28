import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const PLANETS = ['orbita', 'zorx', 'lumi', 'marik', 'home-station', 'learning-center', 'cosmodrome']
const UNLOCKED_PLANETS = ['lumi', 'marik']

const useAppStore = create(
  persist(
    (set) => ({
      // ── Navigation ──
      screen: 'adventure-map',
      screenParams: {},
      navigate: (screen, params = {}) => set({ screen, screenParams: params }),

      // ── User ──
      childName: '',
      childAge: null,
      companion: null,
      setChildName: (childName) => set({ childName }),
      setChildAge: (childAge) => set({ childAge }),
      setCompanion: (companion) => set({ companion }),

      // ── Coins (Юніки) ──
      coins: 0,
      addCoins: (amount) => set((s) => ({ coins: s.coins + amount })),

      // ── Progress ──
      completedLessons: [],
      lessonProgress: {},
      completeLesson: (lessonId, xp = 0) =>
        set((s) => ({
          completedLessons: s.completedLessons.includes(lessonId)
            ? s.completedLessons
            : [...s.completedLessons, lessonId],
          coins: s.coins + xp,
        })),
      setLessonProgress: (lessonId, step) =>
        set((s) => ({
          lessonProgress: { ...s.lessonProgress, [lessonId]: step },
        })),

      // ── Planets ──
      planets: PLANETS,
      unlockedPlanets: UNLOCKED_PLANETS,

      // ── Reward overlay ──
      rewardVisible: false,
      rewardData: null,
      showReward: (data) => set({ rewardVisible: true, rewardData: data }),
      hideReward: () => set({ rewardVisible: false, rewardData: null }),

      // ── Meteor surprise ──
      meteorSurpriseUsed: false,
      setMeteorUsed: () => set({ meteorSurpriseUsed: true }),

      // ── Toast ──
      toastVisible: false,
      toastData: null,
      showToast: (data) => set({ toastVisible: true, toastData: data }),
      hideToast: () => set({ toastVisible: false, toastData: null }),
    }),
    {
      name: 'little-universe-state',
      partialize: (s) => ({
        childName: s.childName,
        childAge: s.childAge,
        companion: s.companion,
        coins: s.coins,
        completedLessons: s.completedLessons,
        lessonProgress: s.lessonProgress,
        meteorSurpriseUsed: s.meteorSurpriseUsed,
      }),
    }
  )
)

export default useAppStore
