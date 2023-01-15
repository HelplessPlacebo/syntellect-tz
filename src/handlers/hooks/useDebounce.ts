import { useCallback, useRef } from 'react'

export const useDebounce = (cb: (...args: any) => void, delay: number) => {
  const timer = useRef<number | null>(null)

  return useCallback((...args: any) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = window.setTimeout(() => {
      cb(...args)
    }, delay)
  }, [cb, delay])
}