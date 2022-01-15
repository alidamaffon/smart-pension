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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders homepage title', async () => {
  const { getByText } = render(<Home />)
  const header = getByText(/Smart traveller/i)
  expect(header).toBeInTheDocument()
})

test('Display result on user nput', async () => {
  const { findByTestId, getByTestId } = render(<Home />)
  const searchField = getByTestId('homepage-input')

  const table = await findByTestId('homepage-table')
  userEvent.type(searchField, 'aris')
  await screen.findByText('Paris')
  expect(table.children.length).toBe(1)
})
