import React from 'react'
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'
import { cities } from '../../api/src/data/cities'
import { Home } from './Home'

const server = setupServer(
  rest.get('http://localhost:4000/rest/cities', (req, res, ctx) => {
    return res(
      ctx.json({
        cities,
        total: 500,
      })
    )
  })
)

describe('<Home /> component', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders home page title', async () => {
    const { getByText } = render(<Home />)
    const Header = getByText(/Smart traveller/i)
    expect(Header).toBeInTheDocument()
  })

  it('renders result on user input', async () => {
    const { findByTestId, getByTestId } = render(<Home />)
    const SearchField = getByTestId('home-input')

    await findByTestId('home-container')
    userEvent.type(SearchField, 'aris')
    const HomeResults = await findByTestId('home-results')
    await screen.findByText('Paris')
    expect(HomeResults.children.length).toBe(1)
  })

  it('renders message when there is no results', async () => {
    const { findByTestId, getByTestId, getByText } = render(<Home />)
    const SearchField = getByTestId('home-input')

    await findByTestId('home-container')
    userEvent.type(SearchField, 'uu')
    const ErrorMessage = getByText(/No results found/i)
    expect(ErrorMessage).toBeInTheDocument()
  })
})
