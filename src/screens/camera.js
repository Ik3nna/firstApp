import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Image, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useSelector, useDispatch } from 'react-redux';
import { todoActions } from '../redux/todo-slice';

const RNCamera = ({ navigation, route }) => {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const todos = useSelector((state)=>state.todo.todos_List);
  const dispatch = useDispatch();

  const updateTask = (id, path)=> {
    const index = todos.findIndex((task)=>task.id === id);

    if (index > -1) {
      let newTasks = [...todos];
      newTasks[index] = { ...newTasks[index], image: path };
      dispatch(todoActions.updateTodo({ id, ...newTasks[index] }));
      Alert.alert("Success", "Task image is saved.");
      navigation.navigate("Task");
    }
  }

  async function toggleCameraType() {
    setType((prevType) =>
      prevType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
    setIsFrontCamera((prev) => !prev);
  }

  async function takePicture() {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      updateTask(route.params?.id, uri);
    }
  }

  async function toggleRecording() {
    if (isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    } else {
      const { uri } = await cameraRef.current.recordAsync();
      console.log('Video recorded:', uri);
      setCapturedImage(null);
      setIsRecording(true);
    }
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  return (
    <View style={styles.body}>
      <Camera style={styles.camera} type={type} ref={cameraRef} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
            
          <TouchableOpacity
            style={styles.button}
            onPress={isRecording ? toggleRecording : takePicture}
          >
            <Text style={styles.text}>
              {isRecording ? 'Stop Recording' : 'Take Picture'}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}

export default RNCamera;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    capturedImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    goBackButton: {
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'center',
    },
    goBackText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})