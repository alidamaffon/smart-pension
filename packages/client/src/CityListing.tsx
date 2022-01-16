import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { fetchRequest } from './api'
import type { CitiesResult } from '../../api/src/cities/types'
import { Box, Image, Badge, SimpleGrid, Spinner, Text } from '@chakra-ui/react'

export type CityListingProps = {
  listingType: 'visited' | 'wishlist'
}

export const CityListing: FC<CityListingProps> = ({ listingType }) => {
  const {
    data: { cities: allCities },
    isLoading,
  } = fetchRequest<CitiesResult>('http://localhost:4000/rest/cities', { cities: [], total: 0 })

  const cities = allCities.filter(city => city[listingType])

  return (
    <Container maxW="container.md" flexDir="row" data-testid="city-listing-container">
      {isLoading ? (
        <Spinner data-testid="loader" />
      ) : !cities.length ? (
        <Text fontSize="md" mt="5" textAlign="center" data-testid="city-listing-error-message">
          No results found
        </Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={5} data-testid="city-listing">
          {cities.map(({ country, visited, wishlist, name, id }) => (
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" key={id}>
              <Image src={`https://placeimg.com/640/480/nature?q=${id}`} alt="placeholder" />

              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {country}
                  </Badge>
                  {listingType === 'visited' && wishlist && (
                    <Badge borderRadius="full" px="2" colorScheme="pink" ml="1">
                      Wishlisted
                    </Badge>
                  )}
                  {listingType === 'wishlist' && visited && (
                    <Badge borderRadius="full" px="2" colorScheme="pink" ml="1">
                      Visited
                    </Badge>
                  )}
                </Box>
                <Heading as="h1" size="md" isTruncated textAlign="left" pt="3" data-testid="city-listing-name">
                  {name}
                </Heading>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Container>
  )
}
