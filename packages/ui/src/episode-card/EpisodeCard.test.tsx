import { render, screen, waitFor } from '@testing-library/react'

import { EpisodeCard } from './EpisodeCard'
import placeholderImg from './insecure.png'

describe('[Component]: EpisodeCard', () => {
  test('render component with default props filled', () => {
    render(
      <EpisodeCard
        episodeTitle={'1'}
        episodeNumber={1}
        isActive={false}
        imgUrl={placeholderImg}
        description={'Description text'}
      />
    )

    expect(screen.getByTestId(/1/i)).toBeInTheDocument()

    expect(
      screen.getByRole('img', {
        name: /episode 1/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /1/i,
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/description text/i)).toBeInTheDocument()
  })

  test('`img` should have a valid url path', async () => {
    render(
      <EpisodeCard
        episodeTitle={'1'}
        episodeNumber={1}
        isActive={false}
        imgUrl={placeholderImg}
        description={'Description text'}
      />
    )

    const image: HTMLImageElement = screen.getByRole('img', {
      name: /episode 1/i,
    })

    await waitFor(() =>
      expect(image).toHaveAttribute('src', '/src/episode-card/insecure.png')
    )
  })
})
