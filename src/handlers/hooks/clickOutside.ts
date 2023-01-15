import { RefObject, useEffect } from 'react'

export const useClickOutside = (ref: RefObject<HTMLElement>, cb: () => void) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (cb) cb()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, cb])
}