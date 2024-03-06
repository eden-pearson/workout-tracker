import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { gql } from 'graphql-request'
import { useMutation } from '@tanstack/react-query'
import graphqlClient from '../graphqlClient'

const mutationDocument = gql`
  mutation MyMutation($newSet: NewSet!) {
    insertSet(
      document: $newSet
      dataSource: "Cluster3"
      database: "workouts"
      collection: "sets"
    ) {
      insertedId
    }
  }
`

export default function NewSetInput() {
  const [reps, setReps] = useState()
  const [weight, setWeight] = useState()

  const {} = useMutation({
    mutationFn: (newSet) => {
      return graphqlClient.request(mutationDocument, { variables: newSet })
    },
  })

  const addSet = () => {
    console.warn('add set', reps, weight)

    setReps('')
    setWeight('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        value={reps}
        onChangeText={setReps}
        style={styles.input}
        placeholder="Reps"
      ></TextInput>
      <TextInput
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        placeholder="Weight"
        keyboardType="numeric"
      ></TextInput>
      <Button title="Add" onPress={addSet}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    flex: 1,
    borderRadius: 5,
    borderColor: 'gainsboro',
  },
})
