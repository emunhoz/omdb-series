import { render, screen } from '@testing-library/react'

import { EpisodeCard } from './EpisodeCard'
import placeholderImg from './insecure.png'

describe('[Component]: EpisodeCard', () => {
  it('renders headline', () => {
    render(
      <EpisodeCard
        episodeTitle={'1'}
        episodeNumber={1}
        isActive={false}
        imgUrl={placeholderImg}
        description={'Description text'}
      />
    )

    screen.logTestingPlaygroundURL()
  })
})
