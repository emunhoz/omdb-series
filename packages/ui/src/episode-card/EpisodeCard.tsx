import styles from './EpisodeCard.module.css'

interface EpisodeCardProps {
  episodeTitle: string
  episodeNumber: number
  isActive: boolean
  imgUrl: string
  description: string
}

export function EpisodeCard({
  episodeTitle,
  episodeNumber,
  isActive,
  imgUrl,
  description,
}: EpisodeCardProps) {
  return (
    <div className={styles.episodeWrapper}>
      <div className={styles.episodeNumber}>{episodeNumber}</div>
      <img
        className={isActive ? styles.episodeImageActive : styles.episodeImage}
        src={imgUrl}
        alt={`Episode ${episodeNumber}`}
        width={201}
        height={134}
      />
      <div className={styles.episodeDetails}>
        <h2 className={styles.episodeTitle}>{episodeTitle}</h2>
        <p className={styles.episodeDescription}>{description}</p>
      </div>
    </div>
  )
}
