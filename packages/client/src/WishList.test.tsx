import React from 'react'
import { render } from './test-utils'
import { WishList } from './WishList'

describe('<WishList /> component', () => {
  it('renders the Header content', () => {
    const { getByText } = render(<WishList />)
    const HeadingComponent = getByText(/^Wish list$/i)
    expect(HeadingComponent).toBeInTheDocument()
  })

  it('renders city listing component', () => {
    const { getByTestId } = render(<WishList />)
    const CityListingComponent = getByTestId('city-listing-container')
    expect(CityListingComponent).toBeInTheDocument()
  })
})
