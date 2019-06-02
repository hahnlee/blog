import React from 'react'
import { Link } from 'gatsby'

import styles from './NavBar.module.scss'

const LINKS = [
  { title: 'About', url: 'https://hanlee.io' },
  { title: 'GitHub', url: 'https://github.com/hahnlee' },
  { title: 'RSS', url: 'https://blog.hanlee.io/rss.xml' },
]

function NavBar() {
  return (
    <nav className={styles.navBar}>
      <div className={styles.content}>
        <Link
          to="/"
          className={styles.homeLink}
        >
          Han Lee
        </Link>
        <section className={styles.links}>
          {LINKS.map(link => (
            <a
              key={link.title}
              href={link.url}
              target="_blink"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          ))}
        </section>
      </div>
    </nav>
  )
}

export default NavBar
