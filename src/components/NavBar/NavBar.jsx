import React from 'react'
import { Link } from 'gatsby'

import styles from './NavBar.module.scss'


const LINKS = [
  { title: 'ABOUT', url: 'https://hanlee.io' },
  { title: 'RESUME', url: '/resume.pdf' },
  { title: 'VIMRC.IO', url: 'https://vimrc.io' },
  { title: 'KODOCS.IO', url: 'https://kodocs.io' },
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
