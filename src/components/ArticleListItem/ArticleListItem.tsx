import React from 'react'
import * as Styled from './ArticleListItem.styled'

interface ArticleListItemProps {
  title: string
  description: string
  to: string
  date: string
  timeToRead: string
}

function ArticleListItem({
  title,
  description,
  to,
  date,
  timeToRead,
}: ArticleListItemProps) {
  return (
    <Styled.Item to={to}>
      <Styled.Content>
        <Styled.Date>
          {date}
          •
          { timeToRead }분
        </Styled.Date>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Description>{description}</Styled.Description>
      </Styled.Content>
    </Styled.Item>
  )
}

export default ArticleListItem
