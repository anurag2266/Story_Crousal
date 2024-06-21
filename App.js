import { StyleSheet, View, Modal, TouchableOpacity, Text, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import StoryFeature from './src/StoryFeature'
const { width, height } = Dimensions.get('window');
const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    openModal()
  }, [])

  const openModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = async () => {
    setIsModalVisible(false);
  }
  return (
    <View style={styles.main}>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.container}>
          <View style={styles.walkthroughModalContent}>
            <StoryFeature
              closeModal={closeModal}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.button} onPress={openModal}>

        <Text style={styles.buttonTextt}>Open Story Crousal</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  walkthroughModalContent: {
    backgroundColor: '#ffffff',
    height,
    paddingTop: 25,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    // paddingBottom: 50
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  button: {
    borderWidth: 1,
    padding: 15,
    backgroundColor: "#063970",
    borderRadius: 10,
    borderColor: "grey"
  },
  buttonTextt: {
    color: "#fff",
    fontWeight: "700"
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
})