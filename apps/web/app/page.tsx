'use client'

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import {
  EpisodeCard,
  EpisodeCardSkeleton,
  Heading,
  SidebarEpisodeDetails,
} from 'ui'
import {
  getSeries,
  fetchEpisodeDetails,
  fetchEpisodiesFromSeason,
} from './services'
import * as styles from './page.module.css'

export default function Page() {
  const [episodeCarouselActive, setCurrentEpisodeCarouselActive] = useState(1)

  const { data: series } = useQuery({
    queryKey: ['hydrate-series'],
    queryFn: getSeries,
    refetchOnWindowFocus: false,
  })

  const { data: season } = useQuery({
    queryKey: ['hydrate-season'],
    queryFn: fetchEpisodiesFromSeason,
    refetchOnWindowFocus: false,
  })

  const sessionEpisodes = season?.Episodes?.map(
    (episodeNumber) => episodeNumber.Episode
  )

  const { data: episodeDetailsData } = useQuery({
    queryKey: ['hydrate-episode-details'],
    queryFn: () => fetchEpisodeDetails(sessionEpisodes),
    refetchOnWindowFocus: false,
    enabled: !!sessionEpisodes,
  })

  const episodeDetailsContentData =
    episodeDetailsData?.length &&
    episodeDetailsData.find(
      (episode) => episode.Episode === String(episodeCarouselActive)
    )

  return (
    <main>
      <section className={styles.mainSection}>
        <div className={styles.mainSectionContainer}>
          <Heading
            seasonNumber={season?.Season && `Season ${season.Season}`}
            title={series?.Title}
            description={series?.Plot}
          />
          <div aria-labelledby="carouselheading" className={styles.pageSection}>
            <h3 id="carouselheading" hidden>
              Episodes
            </h3>

            <div className={styles.carousel}>
              <ul className={styles.carouselWrapper}>
                {episodeDetailsData?.map((item) => (
                  <li
                    className={
                      episodeCarouselActive === Number(item.Episode)
                        ? styles.episodeListItemActive
                        : styles.episodeListItem
                    }
                    key={item.Episode}
                    id={`episode-${item.Episode}`}
                    onClick={() =>
                      setCurrentEpisodeCarouselActive(Number(item.Episode))
                    }
                  >
                    <a
                      href={`#episode-${item.Episode}`}
                      className={styles.episodeLink}
                    >
                      <EpisodeCard
                        episodeTitle={item.Title}
                        episodeNumber={item.Episode}
                        isActive={
                          episodeCarouselActive === Number(item.Episode)
                        }
                        imgUrl={item.Poster}
                        description={item.Plot}
                      />
                    </a>
                  </li>
                )) || <EpisodeCardSkeleton count={3} />}
              </ul>
            </div>
          </div>

          <nav className={styles.arrowsNavigation}>
            <button
              className={styles.arrowsNavigationButton}
              disabled={
                episodeCarouselActive <=
                Number(sessionEpisodes && sessionEpisodes[0])
              }
              onClick={() =>
                setCurrentEpisodeCarouselActive(
                  Number(episodeCarouselActive) - 1
                )
              }
            >
              <a href={`#episode-${episodeCarouselActive}`}>
                <Image
                  src="/icons/tail-left.svg"
                  alt="Tail left"
                  width={44}
                  height={44}
                />
              </a>
            </button>
            <button
              className={styles.arrowsNavigationButton}
              disabled={
                episodeCarouselActive >=
                Number(sessionEpisodes && sessionEpisodes.at(-1))
              }
              onClick={() =>
                setCurrentEpisodeCarouselActive(
                  Number(episodeCarouselActive) + 1
                )
              }
            >
              <a href={`#episode-${episodeCarouselActive}`}>
                <Image
                  src="/icons/tail-right.svg"
                  alt="Tail right"
                  width={44}
                  height={44}
                />
              </a>
            </button>
          </nav>

          {series && (
            <Image
              className={styles.poster}
              src={series?.Poster}
              alt="Poster"
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL="/images/poster.png"
              loading="eager"
            />
          )}
        </div>
      </section>

      <SidebarEpisodeDetails
        episodeDetailsContentData={episodeDetailsContentData}
      />
    </main>
  )
}
