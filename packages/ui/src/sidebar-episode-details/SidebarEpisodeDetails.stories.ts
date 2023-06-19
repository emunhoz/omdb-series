import type { Meta, StoryObj } from '@storybook/react'
import { SidebarEpisodeDetails } from './SidebarEpisodeDetails'

const meta = {
  title: 'Components/SidebarEpisodeDetails',
  component: SidebarEpisodeDetails,
  tags: ['autodocs'],
} satisfies Meta<typeof SidebarEpisodeDetails>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    episodeDetailsContentData: {
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
    },
  },
}
