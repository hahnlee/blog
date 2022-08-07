import type { GatsbySSR } from 'gatsby'
import React from 'react'
import { getCssText } from './src/styles/stitches'

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <style
      id="stitches"
      dangerouslySetInnerHTML={{
        __html: getCssText(),
      }}
    />,
  ])
}
