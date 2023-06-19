import { render, screen } from '@testing-library/react'
import { Heading } from './Heading'

describe('[Component]: Heading', () => {
  test('render component with default props filled', () => {
    render(
      <Heading
        seasonNumber={'1'}
        title={'Season title'}
        description={'Season description'}
      />
    )

    expect(screen.getByText(/1/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        name: /season title/i,
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/season description/i)).toBeInTheDocument()
  })
})
