import { useState, useEffect, useRef } from 'react'

export function useTicker(baseValue, perSecond) {
  const [current, setCurrent] = useState(baseValue)
  const startTime = useRef(Date.now())

  useEffect(() => {
    if (perSecond === 0) return

    let raf
    function tick() {
      const elapsed = (Date.now() - startTime.current) / 1000
      setCurrent(baseValue + elapsed * perSecond)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [baseValue, perSecond])

  return current
}
