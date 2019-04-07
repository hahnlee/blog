import React from 'react'
import { Link } from 'gatsby'

import styles from './NavBar.module.scss'


const LINKS = [
  { title: 'About', url: 'https://hanlee.io' },
  { title: 'GitHub', url: 'https://github.com/hahnlee' },
  { title: 'RSS', url: 'https://blog.hanlee.io/rss.xml' },
]

export const NavBar = () => (
  <nav className={styles.navBar}>
    <div className={styles.content}>
      <Link
        to="/"
        className={styles.homeLink}
      >
        HAN LEE
      </Link>
      <section className={styles.links}>
        {LINKS.map(link => (
          <a
            key={link.title}
            href={link.url}
            target="_blink"
          >
            {link.title}
          </a>
        ))}
      </section>
    </div>
  </nav>
)
