import React from 'react'
import type { FC } from 'react'
import { Heading } from '@chakra-ui/react'
import { CityListing } from './CityListing'

export const WishList: FC = () => (
  <>
    <Heading as="h1" mb="10">
      Wish list
    </Heading>
    <CityListing listingType="wishlist" />
  </>
)
