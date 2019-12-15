import { Link } from 'gatsby'
import styled from 'styled-components'

import Colors from '../../styles/colors'

export const Item = styled(Link)`
  display: flex;
  padding: 1rem 0;
`

export const Content = styled.div`
  flex: 1 1 0;
`

export const Title = styled.h1`
  color: ${Colors.Grey7};
  font-size: 1.75rem;
  line-height: 25px;
  margin: 0;
`

export const Description = styled.p`
  color: ${Colors.Grey6};
  font-size: 16px;
  line-height: 25px;
  margin: 0;
  padding: .5rem 0;
`

export const Date = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: bold;
  color: ${Colors.Grey6};
  padding: .5rem 0;
`

interface ThumbnailProps {
  contain?: boolean,
}

export const Thumbnail = styled.img<ThumbnailProps>`
  width: 200px;
  height: 105px;
  border: 1px solid ${Colors.Grey3};
  margin-right: 30px;
  object-fit: ${props => (props.contain ? 'contain' : 'cover')};

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 50vw;
    margin-right: 0;
    margin-bottom: 15px;
  }
`
