import React, { ReactNode, useEffect, useId, useRef, useState } from 'react'
import { styled } from '@styles/stitches'
import {
  FONT_SIZES,
  ReaderFont,
  ReaderLineHeight,
  ReaderMargin,
  ReaderTheme,
} from '@styles/reader'
import { useReaderSettings } from '@hooks/useReaderSettings'

const THEMES: Array<{ value: ReaderTheme; label: string; swatch: string }> = [
  { value: 'light', label: '밝게', swatch: '#FFFFFF' },
  { value: 'sepia', label: '세피아', swatch: '#F4ECD8' },
  { value: 'dark', label: '어둡게', swatch: '#161616' },
]

const FONTS: Array<{ value: ReaderFont; label: string }> = [
  { value: 'sans', label: '고딕' },
  { value: 'serif', label: '명조' },
]

const LINE_HEIGHTS: Array<{ value: ReaderLineHeight; label: string }> = [
  { value: 'compact', label: '좁게' },
  { value: 'normal', label: '보통' },
  { value: 'relaxed', label: '넓게' },
]

const MARGINS: Array<{ value: ReaderMargin; label: string }> = [
  { value: 'narrow', label: '좁게' },
  { value: 'normal', label: '보통' },
  { value: 'wide', label: '넓게' },
]

export default function ReaderSettings() {
  const { settings, update, reset } = useReaderSettings()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const sizeIndex = FONT_SIZES.indexOf(
    settings.fontSize as (typeof FONT_SIZES)[number],
  )
  const canDecrease = sizeIndex > 0
  const canIncrease = sizeIndex < FONT_SIZES.length - 1

  return (
    <Container ref={containerRef}>
      <Trigger
        ref={triggerRef}
        type="button"
        aria-label="읽기 설정"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <TriggerLabel aria-hidden="true">Aa</TriggerLabel>
      </Trigger>

      {open && (
        <Panel id={panelId} role="dialog" aria-label="읽기 설정">
          <Group label="테마">
            <Segmented>
              {THEMES.map((theme) => (
                <Option
                  key={theme.value}
                  type="button"
                  aria-pressed={settings.theme === theme.value}
                  onClick={() => update({ theme: theme.value })}
                >
                  <Swatch
                    aria-hidden="true"
                    style={{ backgroundColor: theme.swatch }}
                  />
                  {theme.label}
                </Option>
              ))}
            </Segmented>
          </Group>

          <Group label="글꼴">
            <Segmented>
              {FONTS.map((font) => (
                <Option
                  key={font.value}
                  type="button"
                  aria-pressed={settings.font === font.value}
                  onClick={() => update({ font: font.value })}
                  css={{ fontFamily: `$${font.value}` }}
                >
                  {font.label}
                </Option>
              ))}
            </Segmented>
          </Group>

          <Group label="글자 크기">
            <Segmented>
              <Option
                type="button"
                aria-label="글자 작게"
                disabled={!canDecrease}
                onClick={() => update({ fontSize: FONT_SIZES[sizeIndex - 1] })}
              >
                <SizeGlyph css={{ fontSize: 13 }}>A</SizeGlyph>
              </Option>
              <SizeValue aria-live="polite">{settings.fontSize}px</SizeValue>
              <Option
                type="button"
                aria-label="글자 크게"
                disabled={!canIncrease}
                onClick={() => update({ fontSize: FONT_SIZES[sizeIndex + 1] })}
              >
                <SizeGlyph css={{ fontSize: 18 }}>A</SizeGlyph>
              </Option>
            </Segmented>
          </Group>

          <Group label="줄 간격">
            <Segmented>
              {LINE_HEIGHTS.map((lineHeight) => (
                <Option
                  key={lineHeight.value}
                  type="button"
                  aria-pressed={settings.lineHeight === lineHeight.value}
                  onClick={() => update({ lineHeight: lineHeight.value })}
                >
                  {lineHeight.label}
                </Option>
              ))}
            </Segmented>
          </Group>

          <Group label="좌우 여백">
            <Segmented>
              {MARGINS.map((margin) => (
                <Option
                  key={margin.value}
                  type="button"
                  aria-pressed={settings.margin === margin.value}
                  onClick={() => update({ margin: margin.value })}
                >
                  {margin.label}
                </Option>
              ))}
            </Segmented>
          </Group>

          <Footer>
            <Reset type="button" onClick={reset}>
              기본값으로
            </Reset>
          </Footer>
        </Panel>
      )}
    </Container>
  )
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Fieldset>
      <Legend>{label}</Legend>
      {children}
    </Fieldset>
  )
}

const Container = styled('div', {
  position: 'relative',
})

const Trigger = styled('button', {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 36,
  height: 36,
  padding: 0,
  border: '1px solid $gray300',
  borderRadius: 999,
  backgroundColor: 'transparent',
  color: '$gray700',
  cursor: 'pointer',
  transition: 'border-color 0.15s ease, color 0.15s ease',
  '&:hover, &[aria-expanded="true"]': {
    borderColor: '$gray600',
    color: '$gray900',
  },
  '&:focus-visible': {
    outline: '2px solid $gray600',
    outlineOffset: 2,
  },
})

const TriggerLabel = styled('span', {
  fontSize: 14,
  fontWeight: 600,
  letterSpacing: '-0.02em',
  lineHeight: 1,
})

const Panel = styled('div', {
  position: 'absolute',
  top: 'calc(100% + 8px)',
  right: 0,
  zIndex: 10,
  width: 280,
  padding: '16px 16px 12px',
  backgroundColor: '$bg',
  border: '1px solid $gray300',
  borderRadius: 12,
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
  color: '$gray800',
  fontSize: 14,
  lineHeight: 1.4,
  wordBreak: 'keep-all',
})

const Fieldset = styled('div', {
  marginBottom: 14,
})

const Legend = styled('div', {
  marginBottom: 6,
  fontSize: 12,
  color: '$gray500',
  letterSpacing: '0.02em',
})

const Segmented = styled('div', {
  display: 'flex',
  alignItems: 'stretch',
  border: '1px solid $gray300',
  borderRadius: 8,
  overflow: 'hidden',
})

const Option = styled('button', {
  flex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  minHeight: 36,
  padding: '0 8px',
  border: 'none',
  borderRight: '1px solid $gray300',
  backgroundColor: 'transparent',
  color: '$gray700',
  fontSize: 14,
  fontFamily: 'inherit',
  cursor: 'pointer',
  transition: 'background-color 0.15s ease, color 0.15s ease',
  '&:last-child': {
    borderRight: 'none',
  },
  '&:hover:not(:disabled)': {
    backgroundColor: '$gray000',
  },
  '&[aria-pressed="true"]': {
    backgroundColor: '$gray200',
    color: '$gray900',
    fontWeight: 600,
  },
  '&:disabled': {
    color: '$gray400',
    cursor: 'default',
  },
  '&:focus-visible': {
    outline: '2px solid $gray600',
    outlineOffset: -2,
  },
})

const Swatch = styled('span', {
  width: 12,
  height: 12,
  borderRadius: '50%',
  border: '1px solid $gray500',
  flexShrink: 0,
})

const SizeGlyph = styled('span', {
  fontWeight: 600,
  lineHeight: 1,
})

const SizeValue = styled('span', {
  flex: 1,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid $gray300',
  color: '$gray600',
  fontSize: 13,
  fontVariantNumeric: 'tabular-nums',
})

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 4,
})

const Reset = styled('button', {
  padding: '4px 0',
  border: 'none',
  backgroundColor: 'transparent',
  color: '$gray500',
  fontSize: 12,
  fontFamily: 'inherit',
  cursor: 'pointer',
  borderBottom: '1px solid $gray300',
  '&:hover': {
    color: '$gray800',
    borderColor: '$gray600',
  },
  '&:focus-visible': {
    outline: '2px solid $gray600',
    outlineOffset: 2,
  },
})
