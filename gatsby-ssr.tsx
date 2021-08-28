import React from 'react'
import { getCssString } from './src/styles/stitches'

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <style
      id="stitches"
      dangerouslySetInnerHTML={{
        __html: getCssString(),
      }}
    />,
  ])
}
