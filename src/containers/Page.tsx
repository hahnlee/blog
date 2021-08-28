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
  image,
  publishedTime,
}: Props) {
  return (
    <>
      <Helmet>
        <title>명시지(形式知) {title ? `| ${title}` : ''}</title>
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title ?? '명시지(形式知)'} />
        <meta property="og:description" content={description} />
        {image && <meta property="og:image" content={image} />}
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
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {children}
    </>
  )
}
