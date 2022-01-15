import React from 'react'
import type { FC } from 'react'
import { Container, Heading } from '@chakra-ui/react'
import { fetchRequest } from './api'
import type { CitiesResult } from '../../api/src/cities/types'
import { Box, Image, Badge, SimpleGrid, Spinner } from '@chakra-ui/react'

export const Visited: FC = () => {
  const {
    data: { cities: allCities },
    isLoading,
  } = fetchRequest<CitiesResult>('http://localhost:4000/rest/cities', { cities: [], total: 0 })

  const cities = allCities.filter(city => city.visited)

  return (
    <>
      <Heading as="h1" mb="10">
        Visited
      </Heading>
      <Container maxW="container.md" flexDir="row">
        {isLoading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={5}>
            {cities.map(city => (
              <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Image src={`https://placeimg.com/640/480/nature?q=${city.id}`} alt="placeholder" />

                <Box p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="teal">
                      {city.country}
                    </Badge>
                    {city.wishlist && (
                      <Badge borderRadius="full" px="2" colorScheme="pink" ml="1">
                        Wishlisted
                      </Badge>
                    )}
                  </Box>
                  <Heading as="h1" size="md" isTruncated textAlign="left" pt="3">
                    {city.name}
                  </Heading>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  )
}
