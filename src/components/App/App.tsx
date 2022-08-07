import React, { ReactNode } from 'react'
import { globalStyles } from '@styles/stitches'
import 'pretendard/dist/web/static/pretendard.css'

interface Props {
  children: ReactNode
}

export default function App({ children }: Props) {
  globalStyles()

  return <>{children}</>
}
