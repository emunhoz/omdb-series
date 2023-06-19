import Skeleton from 'react-loading-skeleton'
import styles from './Heading.module.css'

interface HeadingProps {
  seasonNumber: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
}

export function Heading({ seasonNumber, title, description }: HeadingProps) {
  return (
    <div className={styles.mainSectionWrapper}>
      <small className={styles.seasonNumber}>
        {seasonNumber || (
          <Skeleton
            baseColor="var(--loading-base-color-dark)"
            highlightColor="var(--loading-highlight-color-dark)"
            width={100}
          />
        )}
      </small>
      <h1 className={styles.seriesName}>
        {title || (
          <Skeleton
            baseColor="var(--loading-base-color-dark)"
            highlightColor="var(--loading-highlight-color-dark)"
            width={400}
          />
        )}
      </h1>
      <p className={styles.seriesDescription}>
        {description || (
          <Skeleton
            count={3}
            baseColor="var(--loading-base-color-dark)"
            highlightColor="var(--loading-highlight-color-dark)"
          />
        )}
      </p>
    </div>
  )
}
