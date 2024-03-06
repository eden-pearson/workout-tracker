import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import graphqlClient from '../graphqlClient'

const setsQuery = gql`
  query exercises {
    sets {
      documents {
        _id
        reps
        weight
      }
    }
  }
`

const SetsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['sets'],
    queryFn: () => graphqlClient.request(setsQuery),
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  return (
    <View>
      <FlatList
        data={data.sets.documents}
        renderItem={({ item }) => (
          <Text
            style={{
              backgroundColor: 'white',
              marginVertical: 10,
              padding: 10,
              borderRadius: 5,
              overflow: 'hidden',
            }}
          >
            {item.reps} x {item.weight}
          </Text>
        )}
      />
    </View>
  )
}

export default SetsList
