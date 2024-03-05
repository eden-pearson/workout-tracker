import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import exercises from '../../assets/data/exercises.json'
import ExerciseListItem from '../components/ExerciseListItem'

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ gap: 5 }}
        data={exercises}
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