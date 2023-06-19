import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

const meta = {
  title: 'Components/Heading',
  component: Heading,
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    title: 'Episode title',
    description: 'Episode description',
    seasonNumber: '1',
  },
}
