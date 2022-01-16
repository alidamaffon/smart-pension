import React from 'react'
import type { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import { CityListing } from './CityListing'

export const Visited: FC = () => {
  return (
    <>
      <Heading as="h1" mb="10">
        Visited
      </Heading>
      <CityListing listingType="visited" />
    </>
  )
}
