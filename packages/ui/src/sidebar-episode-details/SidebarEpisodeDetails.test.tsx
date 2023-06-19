import { render, screen } from '@testing-library/react'
import { SidebarEpisodeDetails } from './SidebarEpisodeDetails'

describe('[Component]: SidebarEpisodeDetails', () => {
  test('render component with default props filled', () => {
    render(
      <SidebarEpisodeDetails
        episodeDetailsContentData={{
          Poster: '/path/to/img.png',
          Title: 'Joan Is Awful',
          Episode: '1',
          Released: '15 Jun 2023',
          imdbRating: '7.9/10',
          Plot: 'An average woman is stunned to discover a global streaming platform has launched a prestige TV drama adaptation of her life - in which she is portrayed by Hollywood A-lister Salma Hayek.',
          Genre: 'Drama',
          Actors: 'Annie Murphy, Salma Hayek, Michael Cera',
          Director: 'Ally Pankiw',
          Writer: 'Charlie Brooker',
        }}
      />
    )

    screen.logTestingPlaygroundURL()

    expect(
      screen.getByRole('img', {
        name: /poster/i,
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/episode 1 - 15 jun 2023/i)).toBeInTheDocument()

    expect(screen.getByText(/⭐️/i)).toBeInTheDocument()
    expect(screen.getByText(/7\.9\/10/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /joan is awful/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'An average woman is stunned to discover a global streaming platform has launched a prestige TV drama adaptation of her life - in which she is portrayed by Hollywood A-lister Salma Hayek.'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('Drama')).toBeInTheDocument()
    expect(screen.getByText(/annie murphy/i)).toBeInTheDocument()
    expect(screen.getByText('Salma Hayek')).toBeInTheDocument()
    expect(screen.getByText(/michael cera/i)).toBeInTheDocument()
    expect(screen.getByText(/ally pankiw/i)).toBeInTheDocument()
    expect(screen.getByText(/charlie brooker/i)).toBeInTheDocument()
  })
})
