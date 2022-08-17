import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  type?: 'website' | 'article'
  title?: string
  description?: string
  image?: string
}

export default function SEO({
  children,
  type = 'website',
  title,
  description = '기록할 수 있는 지식을 나눕니다',
  image = '/images/og.png',
}: Props) {
  return (
    <>
      <title>{title ? `${title} | ` : ''}명시지(明示知)</title>
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title ?? '명시지(明示知)'} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:author" content="이한" />
      <meta
        property="og:site_name"
        content="명시지(明示知) - 기록할 수 있는 지식을 나눕니다"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="명시지(明示知) - 기록할 수 있는 지식을 나눕니다"
        href="/rss.xml"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" content="#000000" />
      {children}
    </>
  )
}
