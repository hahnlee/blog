import React from 'react'

import styles from './ArticleGroup.module.scss'


export const ArticleGroup = ({ children }) => (
  <div className={styles.articleGroup}>
    {children}
  </div>
)
