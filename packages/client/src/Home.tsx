import React from 'react'
import type { FC } from 'react'
import {
  Container,
  InputRightElement,
  Input,
  Heading,
  InputGroup,
  IconButton,
  VStack,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Switch,
  Spinner,
} from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import { fetchRequest, postData } from './api'

import type { CitiesResult, City, UpdateCityPayload } from '../../api/src/cities/types'

export const Home: FC = () => {
  const [filteredCities, setFilteredCities] = React.useState<City[]>([])
  const {
    data: { cities: allCities },
    isLoading,
  } = fetchRequest<CitiesResult>('http://localhost:4000/rest/cities', { cities: [], total: 0 })

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredCities = allCities.filter(city => city.name.toLowerCase().includes(event.target.value))
    setFilteredCities(filteredCities)
  }

  const updateCity = async (cityID: number, payload: UpdateCityPayload) => {
    const response = await postData(`http://localhost:4000/rest/cities/${cityID}`, payload)

    if (response) {
      const index = filteredCities.findIndex(city => city.id === cityID)
      filteredCities[index] = response
      setFilteredCities([...filteredCities])
    }
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <InputGroup>
          <Input onChange={handleOnChange} data-testid="homepage-input" />
          <InputRightElement children={<IconButton aria-label="" icon={<Search2Icon />} />} />
        </InputGroup>
      </Container>
      <Container maxW="container.md">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table>
            <Thead>
              <Tr>
                <Th>City</Th>
                <Th>Visited</Th>
                <Th>Wishlisted</Th>
              </Tr>
            </Thead>
            <Tbody data-testid="homepage-table">
              {filteredCities.map(city => (
                <Tr key={city.id}>
                  <Td>{city.name}</Td>
                  <Td>
                    <Switch
                      isChecked={city.visited}
                      onChange={event =>
                        updateCity(city.id, {
                          visited: event.target.checked,
                        })
                      }
                    />
                  </Td>
                  <Td>
                    <Switch
                      isChecked={city.wishlist}
                      onChange={event =>
                        updateCity(city.id, {
                          wishlist: event.target.checked,
                        })
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Container>
    </VStack>
  )
}
