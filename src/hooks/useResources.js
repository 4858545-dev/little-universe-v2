import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useResources(planetId) {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!planetId) {
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    supabase
      .from('resources')
      .select('id, title, description, type, url, is_free')
      .eq('planet_id', planetId)
      .order('created_at', { ascending: true })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) {
          setError(err.message)
        } else {
          setResources(data ?? [])
        }
        setLoading(false)
      })

    return () => { cancelled = true }
  }, [planetId])

  return { resources, loading, error }
}
