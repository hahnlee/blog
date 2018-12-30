import React from 'react'
import { Link } from 'gatsby'

import styles from './ArticleCard.module.scss'


export const ArticleCard = ({ to, date, title, backgroundColor, color, timeToRead }) => (
  <Link
    className={styles.articleCard} style={{ backgroundColor, color }}
    to={to}
  >
    <div>
      <p style={{ color }}>{date}</p>
      <h1
        className={styles.title}
        style={{ color }}
      >
        {title}
      </h1>
    </div>
    <p
      className={styles.timeToRead}
      style={{ color }}
    >
      <i class="material-icons">timer</i>
      {timeToRead}분
    </p>
  </Link>
)
