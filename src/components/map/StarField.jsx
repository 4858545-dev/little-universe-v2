import { useEffect, useRef } from 'react'
import styles from './StarField.module.css'

function initStars(w, h, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.5 + Math.random() * 2,
    baseOpacity: 0.2 + Math.random() * 0.8,
    phase: Math.random() * Math.PI * 2,
    speed: 0.3 + Math.random() * 1.2,
  }))
}

export default function StarField({ count = 280 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId
    let stars = []
    const startTime = performance.now()

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      stars = initStars(canvas.width, canvas.height, count)
    }

    function draw(now) {
      const elapsed = (now - startTime) / 1000
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const opacity = s.baseOpacity * (0.5 + 0.5 * Math.sin(elapsed * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }
      rafId = requestAnimationFrame(draw)
    }

    resize()
    rafId = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [count])

  return <canvas ref={canvasRef} className={styles.canvas} />
}
