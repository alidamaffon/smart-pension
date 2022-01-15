import React from 'react'
import type { City, UpdateCityPayload } from '../../api/src/cities/types'

export function fetchRequest<T>(
  url: string,
  initialState: T
): {
  data: T
  isLoading: boolean
} {
  const [data, setData] = React.useState<T>(initialState)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url, {
          method: 'GET',
        })
        const data = (await res.json()) as T
        if (res.ok) {
          setData(data)
        } else {
          console.log(`Error ${res.status}: ${res.statusText}`)
        }
      } catch (error) {
        console.log(`Error: ${error}`)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [url])

  return { data, isLoading }
}

export async function postData(url: string, payload: UpdateCityPayload): Promise<City | null> {
  try {
    const res = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = (await res.json()) as City
    return data
  } catch (error) {
    return null
  }
}
