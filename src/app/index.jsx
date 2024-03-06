import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import ExerciseListItem from '../components/ExerciseListItem'
import { useQuery, isLoading, error } from '@tanstack/react-query'
import { request, gql } from 'graphql-request'
import client from '../graphqlClient.js'

const exercisesQuery = gql`
  query exercises($muscle: String, $name: String) {
    exercises(muscle: $muscle, name: $name) {
      difficulty
      equipment
      instructions
      muscle
      name
      type
    }
  }
`

const url = 'https://laredo.stepzen.net/api/willing-opossum/__graphql'

export default function ExercisesScreen() {
  const { data } = useQuery({
    queryKey: ['exercises'],
    queryFn: async () => {
      return client.request(exercisesQuery)
    },
  })
  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch exercises</Text>
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 5 }}
        data={data?.exercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ExerciseListItem item={item} />}
      />

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
})
