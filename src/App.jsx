import { useEffect } from 'react'
import useAppStore from './store/useAppStore'
import useAuthStore from './store/useAuthStore'
import Toast from './components/ui/Toast'
import AppFooter from './components/ui/AppFooter'
import AdventureMapScreen from './screens/AdventureMapScreen'
import PlanetDetailScreen from './screens/PlanetDetailScreen'
import AuthScreen from './screens/AuthScreen'
import AboutScreen from './screens/AboutScreen'
import styles from './App.module.css'

const SCREENS = {
  'adventure-map': AdventureMapScreen,
  course:          PlanetDetailScreen,
  about:           AboutScreen,
}

// Screens where the bottom footer is visible
const FOOTER_SCREENS = new Set(['course'])

function ComingSoon({ name }) {
  const { navigate } = useAppStore()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '24px', padding: '24px' }}>
      <p style={{ fontFamily: 'var(--f-display)', fontSize: '24px', color: 'var(--text-2)' }}>
        {name} — незабаром
      </p>
      <button
        onClick={() => navigate('adventure-map')}
        style={{ fontFamily: 'var(--f-display)', color: 'var(--gold)', background: 'none', border: '1px solid var(--gold)', borderRadius: '999px', padding: '10px 24px', cursor: 'pointer' }}
      >
        ← Карта пригод
      </button>
    </div>
  )
}

export default function App() {
  const { screen, toastVisible, toastData, hideToast } = useAppStore()
  const { isAuthenticated, isLoading, initAuth } = useAuthStore()

  useEffect(() => {
    // initAuth returns the Supabase subscription cleanup fn
    const unsubscribe = initAuth()
    return () => { if (typeof unsubscribe === 'function') unsubscribe() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#05050F',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Comfortaa', sans-serif",
        color: 'rgba(232,224,240,0.5)',
        fontSize: 16,
        letterSpacing: 2,
      }}>
        Запуск двигунів...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AuthScreen />
  }

  const ScreenComponent = SCREENS[screen]

  return (
    <div className={styles.shell}>
      {ScreenComponent ? <ScreenComponent /> : <ComingSoon name={screen} />}
      {FOOTER_SCREENS.has(screen) && <AppFooter />}
      <Toast
        visible={toastVisible}
        message={toastData?.message}
        type={toastData?.type || 'info'}
        onClose={hideToast}
      />
    </div>
  )
}
