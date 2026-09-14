import { darkTheme, sepiaTheme } from './stitches'

export type ReaderTheme = 'light' | 'sepia' | 'dark'
export type ReaderFont = 'sans' | 'serif'
export type ReaderLineHeight = 'compact' | 'normal' | 'relaxed'
export type ReaderMargin = 'narrow' | 'normal' | 'wide'

export interface ReaderSettings {
  theme: ReaderTheme
  font: ReaderFont
  fontSize: number
  lineHeight: ReaderLineHeight
  margin: ReaderMargin
}

export const STORAGE_KEY = 'reader-settings'

export const FONT_SIZES = [15, 16, 17, 18, 20, 22] as const

export const LINE_HEIGHTS: Record<ReaderLineHeight, number> = {
  compact: 1.6,
  normal: 1.85,
  relaxed: 2.1,
}

// 좌우 여백이 넓을수록 본문 폭은 좁아진다.
export const MEASURES: Record<ReaderMargin, string> = {
  narrow: '820px',
  normal: '680px',
  wide: '560px',
}

export const DEFAULT_SETTINGS: ReaderSettings = {
  theme: 'light',
  font: 'sans',
  fontSize: 17,
  lineHeight: 'normal',
  margin: 'normal',
}

export const THEME_CLASS_NAMES: Record<ReaderTheme, string> = {
  light: '',
  sepia: sepiaTheme.className,
  dark: darkTheme.className,
}

export const FONT_VARS: Record<ReaderFont, string> = {
  sans: 'var(--fonts-sans)',
  serif: 'var(--fonts-serif)',
}

function isTheme(value: unknown): value is ReaderTheme {
  return value === 'light' || value === 'sepia' || value === 'dark'
}

function isFont(value: unknown): value is ReaderFont {
  return value === 'sans' || value === 'serif'
}

function isLineHeight(value: unknown): value is ReaderLineHeight {
  return value === 'compact' || value === 'normal' || value === 'relaxed'
}

function isMargin(value: unknown): value is ReaderMargin {
  return value === 'narrow' || value === 'normal' || value === 'wide'
}

function isFontSize(value: unknown): value is number {
  return (
    typeof value === 'number' && (FONT_SIZES as readonly number[]).includes(value)
  )
}

/** localStorage 등 신뢰할 수 없는 값을 검증해 안전한 설정으로 만든다. */
export function sanitize(raw: unknown): ReaderSettings {
  const input = (raw ?? {}) as Partial<Record<keyof ReaderSettings, unknown>>
  return {
    theme: isTheme(input.theme) ? input.theme : DEFAULT_SETTINGS.theme,
    font: isFont(input.font) ? input.font : DEFAULT_SETTINGS.font,
    fontSize: isFontSize(input.fontSize)
      ? input.fontSize
      : DEFAULT_SETTINGS.fontSize,
    lineHeight: isLineHeight(input.lineHeight)
      ? input.lineHeight
      : DEFAULT_SETTINGS.lineHeight,
    margin: isMargin(input.margin) ? input.margin : DEFAULT_SETTINGS.margin,
  }
}

export function loadSettings(): ReaderSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return sanitize(raw ? JSON.parse(raw) : null)
  } catch {
    return DEFAULT_SETTINGS
  }
}

export function saveSettings(settings: ReaderSettings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  } catch {
    // 시크릿 모드 등 저장이 막힌 환경에서는 조용히 무시한다.
  }
}

/**
 * 테마 클래스는 <html>이 아니라 <body>에 붙인다.
 * Stitches 기본 테마는 `:root` 선택자로 변수를 정의하므로 <html>에 붙이면
 * 규칙 순서에 따라 기본 테마에 덮어써질 수 있다. <body>에 붙이면 상속으로 항상 이긴다.
 */
export function applySettings(settings: ReaderSettings) {
  const root = document.documentElement
  const body = document.body

  Object.values(THEME_CLASS_NAMES).forEach((className) => {
    if (className) {
      body.classList.remove(className)
    }
  })
  const themeClass = THEME_CLASS_NAMES[settings.theme]
  if (themeClass) {
    body.classList.add(themeClass)
  }

  root.style.setProperty('--reader-font', FONT_VARS[settings.font])
  root.style.setProperty('--reader-font-size', `${settings.fontSize}px`)
  root.style.setProperty(
    '--reader-line-height',
    String(LINE_HEIGHTS[settings.lineHeight]),
  )
  root.style.setProperty('--reader-measure', MEASURES[settings.margin])
}

/**
 * 첫 페인트 전에 저장된 설정을 적용하는 인라인 스크립트.
 * React가 마운트되기 전에 실행되어야 하므로 의존성 없이 순수 JS 문자열로 만든다.
 * gatsby-ssr의 setPreBodyComponents로 <body> 맨 앞에 삽입되므로 document.body를 쓸 수 있다.
 */
export function getPreloadScript() {
  const config = JSON.stringify({
    key: STORAGE_KEY,
    themes: THEME_CLASS_NAMES,
    fonts: FONT_VARS,
    sizes: FONT_SIZES,
    lineHeights: LINE_HEIGHTS,
    measures: MEASURES,
  })

  return `(function(){try{
var c=${config};
var raw=localStorage.getItem(c.key);
if(!raw)return;
var s=JSON.parse(raw)||{};
var root=document.documentElement;
var theme=c.themes[s.theme];
if(theme)document.body.classList.add(theme);
var font=c.fonts[s.font];
if(font)root.style.setProperty('--reader-font',font);
if(c.sizes.indexOf(s.fontSize)!==-1)root.style.setProperty('--reader-font-size',s.fontSize+'px');
var lh=c.lineHeights[s.lineHeight];
if(lh)root.style.setProperty('--reader-line-height',String(lh));
var m=c.measures[s.margin];
if(m)root.style.setProperty('--reader-measure',m);
}catch(e){}})();`
}
