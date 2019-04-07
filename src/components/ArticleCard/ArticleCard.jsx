import React from 'react'
import { Link } from 'gatsby'

import styles from './ArticleCard.module.scss'

export const ArticleCard = ({ to, date, title, timeToRead }) => (
  <Link
    className={styles.articleCard}
    to={to}
  >
    <div>
      <p className={styles.date}>{date}</p>
      <h1
        className={styles.title}
      >
        {title}
      </h1>
    </div>
    <p
      className={styles.timeToRead}
    >
      <i class="material-icons">timer</i>
      {timeToRead}분
    </p>
  </Link>
)
