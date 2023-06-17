'use client'

import Image from 'next/image'
import * as styles from './page.module.css'
import { useState } from 'react'
import { EpisodeCard } from 'ui'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import {
  getSeries,
  fetchEpisodeDetails,
  fetchEpisodiesFromSeason,
} from './services'

export default function Page() {
  const [episodeCarouselActive, setCurrentEpisodeCarouselActive] = useState(0)

  const { data: series } = useQuery({
    queryKey: ['hydrate-series'],
    queryFn: () => getSeries(),
    refetchOnWindowFocus: false,
  })

  const { data: season } = useQuery({
    queryKey: ['hydrate-season'],
    queryFn: () => fetchEpisodiesFromSeason(),
    refetchOnWindowFocus: false,
  })

  const sessionEpisodes = season?.Episodes?.map(
    (episodeNumber) => episodeNumber.Episode
  )

  const { data: episodeDetailsData, isLoading: isLoadingEpisodes } = useQuery({
    queryKey: ['hydrate-episode-details'],
    queryFn: () => fetchEpisodeDetails(sessionEpisodes),
    refetchOnWindowFocus: false,
    enabled: !!sessionEpisodes,
  })

  const episodeDetailsContentData =
    episodeDetailsData?.length && episodeDetailsData[episodeCarouselActive]

  // const findIndexCurrentEpisode = episodeDetailsData?.findIndex(
  //   (episode) => episode.Episode === String(episodeCarouselActive)
  // )

  return (
    <main>
      <section className={styles.mainSection}>
        <div className={styles.mainSectionContainer}>
          <div className={styles.mainSectionWrapper}>
            <small className={styles.seasonNumber}>
              {season?.Season ? (
                `Season ${season.Season}`
              ) : (
                <Skeleton
                  baseColor="#25282a"
                  highlightColor="#383838"
                  width={100}
                />
              )}
            </small>
            <h1 className={styles.seriesName}>
              {series?.Title || (
                <Skeleton
                  baseColor="#25282a"
                  highlightColor="#383838"
                  width={400}
                />
              )}
            </h1>
            <p className={styles.seriesDescription}>
              {series?.Plot || (
                <Skeleton
                  count={3}
                  baseColor="#25282a"
                  highlightColor="#383838"
                />
              )}
            </p>
          </div>
          <div aria-labelledby="carouselheading" className={styles.pageSection}>
            <h3 id="carouselheading" hidden aria-hidden>
              Episodes
            </h3>

            <div className={styles.carousel}>
              <ul className={styles.carouselWrapper}>
                {isLoadingEpisodes &&
                  Array.from({ length: 5 }).map(() => (
                    <li className={styles.episodeListItem}>
                      <a className={styles.episodeLink}>
                        <EpisodeCard
                          episodeTitle={
                            <Skeleton
                              width={100}
                              baseColor="#25282a"
                              highlightColor="#383838"
                            />
                          }
                          episodeNumber={0}
                          isActive={false}
                          placeholder={
                            <Skeleton
                              width={300}
                              height={134}
                              baseColor="#25282a"
                              highlightColor="#383838"
                            />
                          }
                          imgUrl={''}
                          description={
                            <Skeleton
                              count={3}
                              baseColor="#25282a"
                              highlightColor="#383838"
                            />
                          }
                        />
                      </a>
                    </li>
                  ))}

                {episodeDetailsData?.map((item, index) => (
                  <li
                    className={
                      episodeCarouselActive === index
                        ? styles.episodeListItemActive
                        : styles.episodeListItem
                    }
                    key={item.Episode}
                    arial-hidden={
                      episodeCarouselActive === index ? 'false' : 'true'
                    }
                    id={`-${index}`}
                    onClick={() => setCurrentEpisodeCarouselActive(index)}
                  >
                    <a href={`#-${index}`} className={styles.episodeLink}>
                      <EpisodeCard
                        episodeTitle={item.Title}
                        episodeNumber={item.Episode}
                        isActive={episodeCarouselActive === index}
                        imgUrl={item.Poster}
                        description={item.Plot}
                      />
                    </a>
                  </li>
                ))}
              </ul>
              {/* <nav className={styles.arrowsNavigation}>
              <button
                className={styles.arrowsNavigationButton}
                disabled={findIndexCurrentEpisode <= 0}
              >
                <a
                  href={
                    findIndexCurrentEpisode === 0
                      ? `#-${findIndexCurrentEpisode - 1}`
                      : `#-${findIndexCurrentEpisode}`
                  }
                  onClick={() =>
                    setCurrentEpisodeCarouselActive(episodeCarouselActive - 1)
                  }
                >
                  <Image
                    src="/icons/tail-left.svg"
                    alt={`Tail left`}
                    width={29}
                    height={19}
                  />
                </a>
              </button>
              <button
                className={styles.arrowsNavigationButton}
                disabled={
                  episodeCarouselActive === episodeDetailsData?.length - 1
                }
              >
                <a
                  href={`#-${findIndexCurrentEpisode + 1}`}
                  onClick={() =>
                    setCurrentEpisodeCarouselActive(episodeCarouselActive + 1)
                  }
                >
                  <Image
                    src="/icons/tail-right.svg"
                    alt={`Tail right`}
                    width={29}
                    height={19}
                  />
                </a>
              </button>
            </nav> */}
            </div>
          </div>
          {series && (
            <Image
              className={styles.poster}
              src={series?.Poster}
              alt={`Poster`}
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL="/images/poster.png"
            />
          )}
        </div>
      </section>

      <section className={styles.episodeDetails}>
        {episodeDetailsContentData && (
          <Image
            className={styles.episodeDetailsPoster}
            src={episodeDetailsContentData?.Poster}
            alt={`Poster`}
            width={100}
            height={100}
          />
        )}
        <div className={styles.episodeDetailsHeader}>
          <div className={styles.episodeDetailsHeaderTitle}>
            {episodeDetailsContentData?.Episode ? (
              `Episode ${episodeDetailsContentData?.Episode} - ${episodeDetailsContentData?.Released}`
            ) : (
              <Skeleton
                baseColor="#e0e0e0"
                highlightColor="#f0f0f0"
                width={100}
              />
            )}
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
            {episodeDetailsContentData?.imdbRating === 'N/A' && (
              <div>
                <strong className={styles.ratingClassification}>
                  {episodeDetailsContentData?.imdbRating}
                </strong>
              </div>
            )}

            {episodeDetailsContentData?.imdbRating !== 'N/A' && (
              <div>
                <strong className={styles.ratingClassification}>
                  {episodeDetailsContentData?.imdbRating}
                </strong>
                /10
              </div>
            )}
          </div>
        </div>
        <div className={styles.episodeDetailsContent}>
          <h3 className={styles.episodeDetailsContentTitle}>
            {episodeDetailsContentData?.Title || (
              <Skeleton
                baseColor="#e0e0e0"
                highlightColor="#f0f0f0"
                width={300}
                height={36}
              />
            )}
          </h3>
          <p className={styles.episodeDetailsContentDescription}>
            {episodeDetailsContentData?.Plot || (
              <Skeleton
                baseColor="#e0e0e0"
                highlightColor="#f0f0f0"
                count={3}
              />
            )}
          </p>
        </div>
      </section>
    </main>
  )
}
