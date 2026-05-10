import { useState, useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
import styles from './AuthScreen.module.css'

const ROLES = [
  { id: 'specialist', label: 'Спеціаліст', emoji: '🔬', desc: 'Логопед, психолог, педагог' },
  { id: 'parent',     label: 'Батько/Мати', emoji: '👨‍👩‍👧', desc: 'Для сімейного використання' },
]

// Read OAuth error params from the URL (set by Supabase on failed redirect)
function getOAuthError() {
  const params = new URLSearchParams(window.location.search)
  const hash = new URLSearchParams(window.location.hash.replace('#', '?'))
  const code = params.get('error_code') || hash.get('error_code')
  const desc = params.get('error_description') || hash.get('error_description')
  if (code) {
    return desc
      ? decodeURIComponent(desc.replace(/\+/g, ' '))
      : `Помилка входу через Google (${code})`
  }
  return null
}

function toUkrError(msg = '') {
  if (/invalid login credentials/i.test(msg))  return 'Невірний email або пароль. Спробуйте ще раз.'
  if (/email not confirmed/i.test(msg))         return 'Підтвердіть email перед входом.'
  if (/user already registered/i.test(msg))     return 'Цей email вже зареєстровано.'
  if (/password.*characters/i.test(msg))        return 'Пароль має бути не менше 6 символів.'
  if (/unable to validate/i.test(msg))          return 'Невірний email або пароль. Спробуйте ще раз.'
  return msg
}

export default function AuthScreen() {
  const { login, register, loginWithGoogle, isLoading } = useAuthStore()
  const [mode, setMode] = useState('login')   // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('parent')
  const [error, setError] = useState(() => getOAuthError())

  // Clear URL error params on mount so they don't persist across re-renders
  useEffect(() => {
    if (getOAuthError()) {
      const clean = window.location.pathname
      window.history.replaceState(null, '', clean)
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password, role)
      }
    } catch (err) {
      setError(toUkrError(err.message))
    }
  }

  async function handleGoogle() {
    setError(null)
    try {
      await loginWithGoogle()
    } catch (err) {
      setError(toUkrError(err.message))
    }
  }

  return (
    <div className={styles.screen}>
      {/* Stars backdrop */}
      <div className={styles.stars} aria-hidden="true">
        {Array.from({ length: 60 }).map((_, i) => (
          <div key={i} className={styles.star} style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            width: Math.random() > 0.8 ? 3 : 2,
            height: Math.random() > 0.8 ? 3 : 2,
          }} />
        ))}
      </div>

      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoEmoji}>🌌</span>
          <span className={styles.logoText}>Маленький Всесвіт</span>
        </div>

        <h1 className={styles.title}>
          {mode === 'login' ? 'Стикування' : 'Приєднатись до екіпажу'}
        </h1>
        <p className={styles.subtitle}>
          {mode === 'login'
            ? 'Введіть дані для входу в командний центр'
            : 'Оберіть роль та створіть обліковий запис'}
        </p>

        {/* Google OAuth */}
        <button
          type="button"
          className={styles.googleBtn}
          onClick={handleGoogle}
          disabled={isLoading}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Увійти через Google
        </button>

        <div className={styles.divider}><span>або</span></div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Role selector — register only */}
          {mode === 'register' && (
            <div className={styles.roleRow}>
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={[styles.roleBtn, role === r.id ? styles.roleBtnActive : ''].join(' ')}
                  onClick={() => setRole(r.id)}
                >
                  <span className={styles.roleEmoji}>{r.emoji}</span>
                  <span className={styles.roleLabel}>{r.label}</span>
                  <span className={styles.roleDesc}>{r.desc}</span>
                </button>
              ))}
            </div>
          )}

          <label className={styles.label}>
            <span>Email</span>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </label>

          <label className={styles.label}>
            <span>Пароль</span>
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                minLength={6}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Сховати пароль' : 'Показати пароль'}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading
              ? 'Запуск двигунів...'
              : mode === 'login' ? 'Стикування ✦' : 'Приєднатись до екіпажу ✦'}
          </button>
        </form>

        <p className={styles.switchText}>
          {mode === 'login' ? 'Ще не в екіпажі?' : 'Вже є обліковий запис?'}
          {' '}
          <button
            className={styles.switchBtn}
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }}
          >
            {mode === 'login' ? 'Приєднатись' : 'Увійти'}
          </button>
        </p>
      </div>
    </div>
  )
}
