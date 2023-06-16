import type { Meta, StoryObj } from '@storybook/react'

import { EpisodeCard } from './EpisodeCard'
import thmbnail from './insecure.png'

const meta = {
  title: 'Components/EpisodeCard',
  component: EpisodeCard,
  tags: ['autodocs'],
} satisfies Meta<typeof EpisodeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    episodeTitle: 'Title',
    episodeNumber: 1,
    isActive: false,
    imgUrl: thmbnail,
    description: 'Text description',
  },
}
