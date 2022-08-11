import { styled } from '@styles/stitches'
import React, { useMemo } from 'react'

interface Props {
  id: string
  aspectRatio?: string
  cc?: string
  start?: number
  controls?: boolean
}

export default function YoutubePlayer({
  id,
  cc,
  start,
  controls = true,
  aspectRatio = '1.7',
}: Props) {
  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (cc) {
      params.set('cc_lang_pref', cc)
      params.set('cc_load_policy', '1')
    }

    if (start) {
      params.set('start', `${start}`)
    }

    if (!controls) {
      params.set('controls', '0')
    }

    return params.toString()
  }, [cc, start, controls])

  return (
    <Frame
      style={{
        aspectRatio,
      }}
      src={`https://www.youtube.com/embed/${id}?${query}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  )
}

const Frame = styled('iframe', {
  width: '100%',
  borderRadius: 16,
})
