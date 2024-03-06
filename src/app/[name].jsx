import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import exercises from '../../assets/data/exercises.json'
import { Stack } from 'expo-router'
import { useState } from 'react'

export default function ExerciseDetailsScreen() {
  const params = useLocalSearchParams()
  const [isInstructionExpanded, setIsInstructionExpanded] = useState(false)

  const exercise = exercises.find((item) => item.name === params.name)

  if (!exercise) {
    return <Text>Exercise not found </Text>
  }

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
