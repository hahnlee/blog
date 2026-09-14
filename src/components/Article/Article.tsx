import React, { ReactNode, useEffect, useState } from 'react'
import { Container } from './Article.styled'
import 'prismjs/themes/prism.css'
import { styled } from '@styles/stitches'

interface Props {
  title: string
  date: string
  dateText: string
  timeToRead: number
  children: ReactNode
}

interface LightboxImage {
  src: string
  alt: string
  caption: string
}

export default function Article({
  title,
  date,
  dateText,
  timeToRead,
  children,
}: Props) {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(
    null,
  )

  useEffect(() => {
    const refs = document.querySelectorAll<HTMLAnchorElement>(
      'article a[data-footnote-ref]',
    )

    refs.forEach(ref => {
      const target = ref.getAttribute('href')
      const footnote = target ? document.querySelector(target) : null
      const text = footnote?.textContent?.replace('↩', '').trim()

      if (text) {
        ref.dataset.footnoteTooltip = text
        ref.title = text

        const tooltip = document.createElement('span')
        tooltip.className = 'footnote-tooltip'
        tooltip.textContent = text
        tooltip.setAttribute('role', 'tooltip')
        ref.appendChild(tooltip)
      }
    })
  }, [])

  useEffect(() => {
    const images = document.querySelectorAll<HTMLImageElement>(
      'article .image-figure img',
    )

    images.forEach(image => {
      image.tabIndex = 0
      image.setAttribute('role', 'button')
      image.setAttribute(
        'aria-label',
        `${image.alt || '이미지'} 확대해서 보기`,
      )
    })
  }, [children])

  useEffect(() => {
    if (!lightboxImage) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null)
    }
    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxImage])

  const openLightbox = (target: EventTarget | null) => {
    if (!(target instanceof HTMLImageElement)) return

    const figure = target.closest('figure.image-figure')
    if (!figure) return

    setLightboxImage({
      src: target.currentSrc || target.src,
      alt: target.alt,
      caption: figure.querySelector('figcaption')?.textContent?.trim() || '',
    })
  }

  return (
    <Container
      onClick={event => openLightbox(event.target)}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          openLightbox(event.target)
        }
      }}
    >
      <Header>
        <Title>{title}</Title>
        <Meta>
          <time dateTime={date}>{dateText}</time>
          <Separator aria-hidden="true">·</Separator>
          <span>{timeToRead}분 읽기</span>
        </Meta>
      </Header>
      {children}
      {lightboxImage && (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="이미지 확대 보기"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="image-lightbox__close"
            type="button"
            aria-label="이미지 닫기"
            onClick={() => setLightboxImage(null)}
          >
            ×
          </button>
          <div
            className="image-lightbox__content"
            onClick={event => event.stopPropagation()}
          >
            <img src={lightboxImage.src} alt={lightboxImage.alt} />
            {lightboxImage.caption && (
              <p className="image-lightbox__caption">
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </Container>
  )
}

const Header = styled('header', {
  marginBottom: 48,
  paddingBottom: 24,
  borderBottom: '1px solid $gray800',
})

const Title = styled('h1', {
  fontFamily: '$reader',
  fontSize: '2.1rem',
  lineHeight: 1.35,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  color: '$gray900',
  margin: '0 0 12px !important',
  wordBreak: 'keep-all',
  '@media screen and (max-width: 720px)': {
    fontSize: '1.75rem',
  },
})

const Meta = styled('p', {
  margin: '0 !important',
  fontSize: '0.85rem',
  color: '$gray500',
  letterSpacing: '0.02em',
  fontVariantNumeric: 'tabular-nums',
})

const Separator = styled('span', {
  margin: '0 8px',
})
