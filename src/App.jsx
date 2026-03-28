import useAppStore from './store/useAppStore'
import Toast from './components/ui/Toast'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import AdventureMapScreen from './screens/AdventureMapScreen'
import styles from './App.module.css'

const SCREENS = {
  onboarding:      OnboardingScreen,
  home:            HomeScreen,
  'adventure-map': AdventureMapScreen,
}

function ComingSoon({ name }) {
  const { navigate } = useAppStore()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '24px', padding: '24px' }}>
      <p style={{ fontFamily: 'var(--f-display)', fontSize: '24px', color: 'var(--text-2)' }}>
        {name} — незабаром
      </p>
      <button
        onClick={() => navigate('home')}
        style={{ fontFamily: 'var(--f-display)', color: 'var(--gold)', background: 'none', border: '1px solid var(--gold)', borderRadius: '999px', padding: '10px 24px', cursor: 'pointer' }}
      >
        ← На головну
      </button>
    </div>
  )
}

export default function App() {
  const { screen, companion, toastVisible, toastData, hideToast } = useAppStore()

  const activeScreen = !companion && screen !== 'onboarding' && screen !== 'adventure-map' ? 'onboarding' : screen
  const ScreenComponent = SCREENS[activeScreen]

  return (
    <div className={styles.shell}>
      {ScreenComponent ? <ScreenComponent /> : <ComingSoon name={activeScreen} />}
      <Toast
        visible={toastVisible}
        message={toastData?.message}
        type={toastData?.type || 'info'}
        onClose={hideToast}
      />
    </div>
  )
}
