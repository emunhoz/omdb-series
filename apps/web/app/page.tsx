'use client'

import React, { useState } from 'react'
import { useQueries, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import { EpisodeCard } from 'ui'
import {
  getSeries,
  fetchEpisodeDetails,
  fetchEpisodiesFromSeason,
  fetchEpisodeByNumber,
} from './services'
import * as styles from './page.module.css'
import { fullUrl, seasonNumber } from './const'

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

  const { data: episodeDetailsData, isLoading: isLoadingEpisodes } = useQuery({
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
            <h3 id="carouselheading" hidden>
              Episodes
            </h3>

            <div className={styles.carousel}>
              <ul className={styles.carouselWrapper}>
                {isLoadingEpisodes &&
                  Array.from({ length: 5 }).map((_, index) => (
                    <li className={styles.episodeListItem} key={index}>
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
                ))}
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

      <section className={styles.episodeDetails}>
        {(episodeDetailsContentData && (
          <Image
            className={styles.episodeDetailsPoster}
            src={episodeDetailsContentData?.Poster}
            alt="Poster"
            width={100}
            height={100}
            loading="eager"
          />
        )) || (
          <Skeleton baseColor="#e0e0e0" highlightColor="#f0f0f0" height={536} />
        )}
        <div className={styles.episodeDetailsHeader}>
          <div className={styles.episodeDetailsHeaderTitle}>
            {episodeDetailsContentData?.Episode ? (
              `Episode ${episodeDetailsContentData?.Episode} - ${episodeDetailsContentData?.Released}`
            ) : (
              <Skeleton
                baseColor="#e0e0e0"
                highlightColor="#f0f0f0"
                width={192}
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
            {episodeDetailsContentData?.imdbRating === 'N/A' ? (
              <div>
                <strong className={styles.ratingClassification}>
                  {episodeDetailsContentData?.imdbRating}
                </strong>
              </div>
            ) : (
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
                width={150}
                height={36}
              />
            )}
          </h3>
          <p className={styles.episodeDetailsContentDescription}>
            {episodeDetailsContentData?.Plot || (
              <Skeleton
                baseColor="#e0e0e0"
                highlightColor="#f0f0f0"
                count={4}
              />
            )}
          </p>

          <dl className={styles.episodeDetailsContentList}>
            <dt className={styles.episodeDetailsContentListTitle}>Genre</dt>
            {episodeDetailsContentData?.Genre?.split(',').map((actor) => (
              <dd key={actor}>{actor}</dd>
            )) || (
              <Skeleton
                baseColor="#e0e0e0"
                highlightColor="#f0f0f0"
                width={80}
                count={3}
              />
            )}
          </dl>

          <dl className={styles.episodeDetailsContentList}>
            <dt className={styles.episodeDetailsContentListTitle}>Actors</dt>
            {episodeDetailsContentData?.Actors?.split(',').map((actor) => (
              <dd key={actor}>{actor}</dd>
            )) || (
              <Skeleton
                baseColor="#e0e0e0"
                highlightColor="#f0f0f0"
                count={3}
                width={100}
              />
            )}
          </dl>

          <div className={styles.episodeDetailsContentList}>
            <h3 className={styles.episodeDetailsContentListTitle}>Director</h3>
            <div>
              {episodeDetailsContentData?.Director || (
                <Skeleton
                  baseColor="#e0e0e0"
                  width={100}
                  highlightColor="#f0f0f0"
                />
              )}
            </div>
          </div>

          <div className={styles.episodeDetailsContentList}>
            <h3 className={styles.episodeDetailsContentListTitle}>Writer</h3>
            <div>
              {episodeDetailsContentData?.Writer || (
                <Skeleton
                  baseColor="#e0e0e0"
                  width={150}
                  highlightColor="#f0f0f0"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
