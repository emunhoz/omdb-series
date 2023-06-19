import styles from './Heading.module.css'

interface HeadingProps {
  seasonNumber: string | React.ReactNode
  title: string | React.ReactNode
  description: string | React.ReactNode
}

export function Heading({ seasonNumber, title, description }: HeadingProps) {
  return (
    <div className={styles.mainSectionWrapper}>
      <small className={styles.seasonNumber}>{seasonNumber}</small>
      <h1 className={styles.seriesName}>{title}</h1>
      <p className={styles.seriesDescription}>{description}</p>
    </div>
  )
}
