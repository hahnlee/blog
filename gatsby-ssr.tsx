import type { GatsbySSR } from 'gatsby'
import React from 'react'
import { getCssText } from './src/styles/stitches'
import { getPreloadScript } from './src/styles/reader'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
  setPreBodyComponents,
}) => {
  setHeadComponents([
    <style
      key="stitches"
      id="stitches"
      dangerouslySetInnerHTML={{
        __html: getCssText(),
      }}
    />,
  ])

  // 저장된 리더 설정(테마·글꼴 등)을 첫 페인트 전에 적용해 화면이 깜빡이지 않게 한다.
  setPreBodyComponents([
    <script
      key="reader-settings"
      dangerouslySetInnerHTML={{
        __html: getPreloadScript(),
      }}
    />,
  ])
}
