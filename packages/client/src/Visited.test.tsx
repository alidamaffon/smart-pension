import React from 'react'
import { render } from './test-utils'
import { Visited } from './Visited'

describe('<Visited /> component', () => {
  it('renders the Header content', () => {
    const { getByText } = render(<Visited />)
    const HeadingComponent = getByText(/^Visited$/i)
    expect(HeadingComponent).toBeInTheDocument()
  })

  it('renders city listing component', () => {
    const { getByTestId } = render(<Visited />)
    const CityListingComponent = getByTestId('city-listing-container')
    expect(CityListingComponent).toBeInTheDocument()
  })
})
