'use client'

import Image from 'next/image'
import * as styles from './page.module.css'
import { useEffect, useState } from 'react'

export default function Page() {
  const [episodeCarousel, setEpisodeCarousel] = useState(0)

  const carouselItems = [
    {
      imgUrl: '/images/episodes/insecure.png',
    },
    {
      imgUrl: '/images/episodes/insecure.png',
    },
    {
      imgUrl: '/images/episodes/insecure.png',
    },
    {
      imgUrl: '/images/episodes/insecure.png',
    },
    {
      imgUrl: '/images/episodes/insecure.png',
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
                  className={styles.episodeListItem}
                  key={index}
                  arial-hidden={episodeCarousel === index ? 'true' : 'false'}
                  id={`episode-${index}`}
                >
                  <a
                    href={`#episode-${index}`}
                    className={styles.episodeWrapper}
                  >
                    <div
                      className={styles.episodeNumber}
                      onFocus={() => console.log(index)}
                    >
                      {index}
                    </div>
                    <Image
                      className={
                        episodeCarousel === index
                          ? styles.episodeImageActive
                          : styles.episodeImage
                      }
                      src={item.imgUrl}
                      alt={`Episode ${index}`}
                      width={201}
                      height={134}
                    />
                  </a>
                  <h2 className={styles.episodeTitle}>Insecure as Fuck</h2>
                  <p className={styles.episodeDescription}>
                    In the wake of her 29th birthday, Issa reflects on her life
                    and relationship choices.
                  </p>
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
            Insecure as Fuck
          </h3>
          <p className={styles.episodeDetailsContentDescription}>
            In the wake of her 29th birthday, Issa reflects on her life and
            relationship choices.
          </p>
        </div>
      </section>
    </main>
  )
}
