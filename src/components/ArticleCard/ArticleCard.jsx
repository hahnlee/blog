import React from 'react'
import { Link } from 'gatsby'

import styles from './ArticleCard.module.scss'

function ArticleCard({ to, date, title, timeToRead, description }) {
  return (
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
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  )
}

export default ArticleCard
