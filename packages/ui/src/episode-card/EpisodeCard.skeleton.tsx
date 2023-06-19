import { EpisodeCard } from './EpisodeCard'
import Skeleton from 'react-loading-skeleton'
import styles from './EpisodeCard.module.css'

interface EpisodeCardSkeletonProps {
  count: number
}

export function EpisodeCardSkeleton({ count }: EpisodeCardSkeletonProps) {
  return Array.from({ length: count }).map((_, index) => (
    <li className={styles.episodeListItem} key={index}>
      <div>
        <EpisodeCard
          episodeTitle={
            <Skeleton
              width={100}
              baseColor="var(--loading-base-color-dark)"
              highlightColor="var(--loading-highlight-color-dark)"
            />
          }
          episodeNumber={0}
          isActive={false}
          placeholder={
            <Skeleton
              width={300}
              height={134}
              baseColor="var(--loading-base-color-dark)"
              highlightColor="var(--loading-highlight-color-dark)"
            />
          }
          imgUrl={''}
          description={
            <Skeleton
              count={3}
              baseColor="var(--loading-base-color-dark)"
              highlightColor="var(--loading-highlight-color-dark)"
            />
          }
        />
      </div>
    </li>
  ))
}
