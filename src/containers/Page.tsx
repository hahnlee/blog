import React, { ReactNode } from 'react'
import Helmet from 'react-helmet'

interface Props {
  children: ReactNode
  type?: 'website' | 'article'
  title?: string
  description?: string
  image?: string
  publishedTime?: string
}

export default function Page({
  children,
  type = 'website',
  title,
  description = '기록할 수 있는 지식을 나눕니다',
  image = '/images/og.png',
  publishedTime,
}: Props) {
  return (
    <>
      <Helmet>
        <title>명시지(形式知) {title ? `| ${title}` : ''}</title>
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title ?? '명시지(形式知)'} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:author" content="이한" />
        <meta
          property="og:site_name"
          content="명시지(形式知) - 기록할 수 있는 지식을 나눕니다"
        />
        {type === 'article' && (
          <meta property="article:author" content="이한" />
        )}
        {publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="명시지(形式知) - 기록할 수 있는 지식을 나눕니다"
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
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </>
  )
}
