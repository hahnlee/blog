import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_SETTINGS,
  ReaderSettings,
  applySettings,
  loadSettings,
  saveSettings,
} from '@styles/reader'

/**
 * 리더 설정을 읽고 변경하는 훅.
 * SSR과 첫 하이드레이션에서는 기본값을 쓰고, 마운트 후 localStorage 값으로 동기화한다.
 * (실제 화면은 gatsby-ssr의 인라인 스크립트가 이미 저장된 설정으로 그려둔 상태다.)
 */
export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  const update = useCallback((patch: Partial<ReaderSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch }
      applySettings(next)
      saveSettings(next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    applySettings(DEFAULT_SETTINGS)
    saveSettings(DEFAULT_SETTINGS)
    setSettings(DEFAULT_SETTINGS)
  }, [])

  return { settings, update, reset }
}
