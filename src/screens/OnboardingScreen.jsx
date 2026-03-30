import useAppStore from '../store/useAppStore'
import CharacterCard from '../components/characters/CharacterCard'
import Button from '../components/ui/Button'
import styles from './OnboardingScreen.module.css'

const CHARACTERS = ['lumi', 'orbita', 'zorx', 'marik']

export default function OnboardingScreen() {
  const { companion, setCompanion, navigate } = useAppStore()

  const handleStart = () => {
    if (companion) navigate('adventure-map')
  }

  return (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1 className={styles.title}>Маленький Всесвіт</h1>
        <p className={styles.subtitle}>Обери свого космічного напарника</p>
      </div>

      <div className={styles.grid}>
        {CHARACTERS.map((id, i) => (
          <CharacterCard
            key={id}
            character={id}
            selected={companion === id}
            onSelect={setCompanion}
            index={i}
          />
        ))}
      </div>

      <Button
        variant="gold"
        size="lg"
        disabled={!companion}
        onClick={handleStart}
      >
        Розпочати місію
      </Button>
    </div>
  )
}
