import React from 'react'
import * as Styled from './ArticleListItem.styled'

interface ArticleListItemProps {
  title: string,
  description: string,
  to: string,
  date: string,
  thumbnail: {
    url: {
      publicURL: string,
    },
    contain: boolean,
  },
}

function ArticleListItem({
  title,
  description,
  to,
  date,
  thumbnail,
}: ArticleListItemProps) {
  return (
    <Styled.Item to={to}>
      <Styled.Thumbnail
        src={thumbnail && thumbnail.url.publicURL}
        contain={thumbnail && thumbnail.contain}
      />
      <Styled.Content>
        <Styled.Date>{date}</Styled.Date>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Description>{description}</Styled.Description>
      </Styled.Content>
    </Styled.Item>
  )
}

export default ArticleListItem
