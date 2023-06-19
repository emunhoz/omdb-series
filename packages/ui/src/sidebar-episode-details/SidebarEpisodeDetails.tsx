import Skeleton from 'react-loading-skeleton'
import styles from './SibarEpisodeDetails.module.css'

interface SidebarEpisodeDetailsProps {
  episodeDetailsContentData: {
    Poster: string
    Title: string
    Episode: string
    Released: string
    imdbRating: string
    Plot: string
    Genre: string
    Actors: string
    Director: string
    Writer: string
  }
}

export function SidebarEpisodeDetails({
  episodeDetailsContentData,
}: SidebarEpisodeDetailsProps) {
  return (
    <section className={styles.episodeDetails}>
      {(episodeDetailsContentData && (
        <img
          className={styles.episodeDetailsPoster}
          src={episodeDetailsContentData?.Poster}
          alt="Poster"
          width={100}
          height={100}
          loading="eager"
        />
      )) || (
        <Skeleton
          baseColor="var(--loading-base-color)"
          highlightColor="var(--loading-highlight-color)"
          height={536}
        />
      )}
      <div className={styles.episodeDetailsHeader}>
        <div className={styles.episodeDetailsHeaderTitle}>
          {episodeDetailsContentData?.Episode ? (
            `Episode ${episodeDetailsContentData?.Episode} - ${episodeDetailsContentData?.Released}`
          ) : (
            <Skeleton
              baseColor="var(--loading-base-color)"
              highlightColor="var(--loading-highlight-color)"
              width={192}
            />
          )}
        </div>
        <div className={styles.rating}>
          <div>⭐️</div>
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
              baseColor="var(--loading-base-color)"
              highlightColor="var(--loading-highlight-color)"
              width={150}
              height={36}
            />
          )}
        </h3>
        <p className={styles.episodeDetailsContentDescription}>
          {episodeDetailsContentData?.Plot || (
            <Skeleton
              baseColor="var(--loading-base-color)"
              highlightColor="var(--loading-highlight-color)"
              count={4}
            />
          )}
        </p>

        <dl className={styles.episodeDetailsContentList}>
          <dt className={styles.episodeDetailsContentListTitle}>Genre</dt>
          {episodeDetailsContentData?.Genre?.split(',').map((actor: string) => (
            <dd key={actor}>{actor}</dd>
          )) || (
            <Skeleton
              baseColor="var(--loading-base-color)"
              highlightColor="var(--loading-highlight-color)"
              width={80}
              count={3}
            />
          )}
        </dl>

        <dl className={styles.episodeDetailsContentList}>
          <dt className={styles.episodeDetailsContentListTitle}>Actors</dt>
          {episodeDetailsContentData?.Actors?.split(',').map(
            (actor: string) => <dd key={actor}>{actor}</dd>
          ) || (
            <Skeleton
              baseColor="var(--loading-base-color)"
              highlightColor="var(--loading-highlight-color)"
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
                baseColor="var(--loading-base-color)"
                width={100}
                highlightColor="var(--loading-highlight-color)"
              />
            )}
          </div>
        </div>

        <div className={styles.episodeDetailsContentList}>
          <h3 className={styles.episodeDetailsContentListTitle}>Writer</h3>
          <div>
            {episodeDetailsContentData?.Writer || (
              <Skeleton
                baseColor="var(--loading-base-color)"
                width={150}
                highlightColor="var(--loading-highlight-color)"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
