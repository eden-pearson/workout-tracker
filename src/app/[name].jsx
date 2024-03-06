import { Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { gql } from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import graphqlClient from '../graphqlClient'

const exerciseQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      equipment
      instructions
      muscle
      name
      type
    }
  }
`

export default function ExerciseDetailsScreen() {
  const { name } = useLocalSearchParams()
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ['exercises', name],
    queryFn: () => graphqlClient.request(exerciseQuery, { name }),
  })

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch data </Text>
  }
  const exercise = data.exercises[0]

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: exercise.name }} />
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text
        style={styles.instructions}
        numberOfLines={isInstructionExpanded ? 0 : 3}
      >
        Instructions: {exercise.instructions}
      </Text>
      <Text
        onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
        style={styles.seeMore}
      >
        {isInstructionExpanded ? 'See less' : 'See more'}
      </Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: '500',
  },
  exerciseSubtitle: {
    color: 'gray',
  },
  subValue: {
    textTransform: 'capitalize',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 20,
  },
  seeMore: {
    alignSelf: 'center',
    color: 'gray',
  },
})
