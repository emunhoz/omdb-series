'use client'

import Image from 'next/image'
import * as styles from './page.module.css'
import { useEffect, useState } from 'react'
import { EpisodeCard } from 'ui'

export default function Page() {
  const [episodeCarousel, setEpisodeCarousel] = useState(0)

  const carouselItems = [
    {
      title: 'Insecure as Fuck',
      imgUrl: '/images/episodes/insecure.png',
      description:
        'In the wake of her 29th birthday, Issa reflects on herlife and relationship choices.',
    },
    {
      title: 'Messy as Fuck',
      imgUrl: '/images/episodes/insecure.png',
      description:
        'Issa struggles with her feelings about Lawrence, work, and her life.',
    },
    {
      title: 'Racist as Fuck',
      imgUrl: '/images/episodes/insecure.png',
      description:
        'Issa and Lawrence try to move past their issues at home; Issa deals with doubts from lorem ipsum dolor sit',
    },
    {
      title: 'Thirsty as Fuck',
      imgUrl: '/images/episodes/insecure.png',
      description:
        'Issa turns to Daniel for help during Career Day; Molly finds herself in a tough lorem ipsum dolor sit',
    },
  ]

  useEffect(() => {
    const onHashChanged = () => {
      const episodeNumber = window.location.hash.split('-')[1]
      setEpisodeCarousel(Number(episodeNumber))
    }

    window.addEventListener('hashchange', onHashChanged)

    return () => {
      window.removeEventListener('hashchange', onHashChanged)
    }
  }, [episodeCarousel, setEpisodeCarousel])

  return (
    <main>
      <section className={styles.mainSection}>
        <div>
          <small className={styles.seasonNumber}>Season 1</small>
          <h1 className={styles.seriesName}>Insecure</h1>
          <p className={styles.seriesDescription}>
            Follows the awkward experiences and racy tribulations of a
            modern-day African-American woman.
          </p>
        </div>
        <div aria-labelledby="carouselheading" className={styles.pageSection}>
          <h3 id="carouselheading" hidden aria-hidden>
            Episodes
          </h3>

          <div className={styles.carousel}>
            <ul className={styles.carouselWrapper}>
              {carouselItems.map((item, index) => (
                <li
                  className={
                    episodeCarousel === index
                      ? styles.episodeListItemActive
                      : styles.episodeListItem
                  }
                  key={index}
                  arial-hidden={episodeCarousel === index ? 'true' : 'false'}
                  id={`episode-${index}`}
                >
                  <a href={`#episode-${index}`} className={styles.episodeLink}>
                    <EpisodeCard
                      episodeTitle={item.title}
                      episodeNumber={index}
                      isActive={episodeCarousel === index}
                      imgUrl={item.imgUrl}
                      description={item.description}
                    />
                  </a>
                </li>
              ))}
            </ul>
            <nav className={styles.arrowsNavigation}>
              <a
                href={
                  episodeCarousel === 0
                    ? `#episode-${episodeCarousel}`
                    : `#episode-${episodeCarousel - 1}`
                }
              >
                <Image
                  src="/icons/tail-left.svg"
                  alt={`Tail left`}
                  width={29}
                  height={19}
                />
              </a>
              <a
                href={
                  episodeCarousel === carouselItems.length - 1
                    ? `#episode-${episodeCarousel}`
                    : `#episode-${episodeCarousel + 1}`
                }
              >
                <Image
                  src="/icons/tail-right.svg"
                  alt={`Tail right`}
                  width={29}
                  height={19}
                />
              </a>
            </nav>
          </div>
        </div>
        <Image
          className={styles.poster}
          src="/images/poster.png"
          alt={`Poster`}
          width={100}
          height={100}
        />
      </section>
      <section className={styles.episodeDetails}>
        <div className={styles.episodeDetailsHeader}>
          <div className={styles.episodeDetailsHeaderTitle}>
            Episode {episodeCarousel} - 2011-04-17
          </div>
          <div className={styles.rating}>
            <div>
              <Image
                className={styles.ratingStarIcon}
                src="/icons/start-icon.svg"
                alt="Star icon"
                width={24}
                height={24}
              />
            </div>
            <div>
              <strong className={styles.ratingClassification}>9</strong>/10
            </div>
          </div>
        </div>
        <div className={styles.episodeDetailsContent}>
          <h3 className={styles.episodeDetailsContentTitle}>
            {carouselItems[episodeCarousel].title}
          </h3>
          <p className={styles.episodeDetailsContentDescription}>
            {carouselItems[episodeCarousel].description}
          </p>
        </div>
      </section>
    </main>
  )
}
