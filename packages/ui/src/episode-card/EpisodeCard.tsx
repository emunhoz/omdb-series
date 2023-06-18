import styles from './EpisodeCard.module.css'

interface EpisodeCardProps {
  episodeTitle: string | React.ReactNode
  episodeNumber: number
  isActive: boolean
  placeholder?: React.ReactNode
  imgUrl: string
  description: string | React.ReactNode
}

export function EpisodeCard({
  episodeTitle,
  episodeNumber,
  isActive,
  placeholder,
  imgUrl,
  description,
}: EpisodeCardProps) {
  return (
    <div className={styles.episodeWrapper}>
      {imgUrl.length === 0 && placeholder}
      {imgUrl.length !== 0 && (
        <>
          <div className={styles.episodeNumber}>{episodeNumber}</div>
          <img
            loading="lazy"
            className={
              isActive ? styles.episodeImageActive : styles.episodeImage
            }
            src={imgUrl}
            alt={`Episode ${episodeNumber}`}
            width={201}
            height={134}
          />
        </>
      )}
      <div className={styles.episodeDetails}>
        <h2 className={styles.episodeTitle}>{episodeTitle}</h2>
        <p className={styles.episodeDescription}>{description}</p>
      </div>
    </div>
  )
}
