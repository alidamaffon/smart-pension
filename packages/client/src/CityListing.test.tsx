import React from 'react'
import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { CityListing } from './CityListing'

const mockData = {
  cities: [
    {
      id: 0,
      name: 'Moscow',
      country: 'Russia',
      visited: true,
      wishlist: true,
    },
    {
      id: 1,
      name: 'London',
      country: 'United Kingdom',
      visited: false,
      wishlist: true,
    },
    {
      id: 2,
      name: 'Saint Petersburg',
      country: 'Russia',
      visited: false,
      wishlist: false,
    },
    {
      id: 3,
      name: 'Berlin',
      country: 'Germany',
      visited: true,
      wishlist: false,
    },
    {
      id: 4,
      name: 'Madrid',
      country: 'Spain',
      visited: true,
      wishlist: false,
    },
    {
      id: 5,
      name: 'Kyiv',
      country: 'Ukraine',
      visited: false,
      wishlist: false,
    },
  ],
  total: 6,
}

const server = setupServer(
  rest.get('http://localhost:4000/rest/cities', (req, res, ctx) => {
    return res(ctx.json(mockData))
  })
)

describe('<CityListing /> component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders visited cities', async () => {
    const { findByTestId, queryAllByTestId } = render(<CityListing listingType="visited" />)
    const listingContainer = await findByTestId('city-listing')
    const cityNameList = queryAllByTestId('city-listing-name')
    expect(listingContainer.children.length).toBe(3)
    expect(cityNameList[0].textContent).toBe('Moscow')
    expect(cityNameList[1].textContent).toBe('Berlin')
    expect(cityNameList[2].textContent).toBe('Madrid')
  })

  it('renders wishlisted cities', async () => {
    const { findByTestId, queryAllByTestId } = render(<CityListing listingType="wishlist" />)
    const listingContainer = await findByTestId('city-listing')
    const cityNameList = queryAllByTestId('city-listing-name')
    expect(listingContainer.children.length).toBe(2)
    expect(cityNameList[0].textContent).toBe('Moscow')
    expect(cityNameList[1].textContent).toBe('London')
  })

  it('renders spinner', () => {
    const { getByTestId } = render(<CityListing listingType="wishlist" />)
    expect(getByTestId('loader')).toBeInTheDocument()
  })

  it('renders error message', async () => {
    server.use(
      rest.get('http://localhost:4000/rest/cities', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    const { getByText, findByTestId } = render(<CityListing listingType="wishlist" />)
    await findByTestId('city-listing-error-message')
    const ErrorMessage = getByText(/^No results found$/i)
    expect(ErrorMessage).toBeInTheDocument()
  })
})
