import { useRef, useEffect, useReducer, useCallback, DependencyList, useState } from 'react'

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void | null>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback?.current()
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export const useIsMounted = (): (() => boolean) => {
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const checker = useCallback((): boolean => {
    return isMounted.current
  }, [])

  return checker
}
