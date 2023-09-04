import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const RNCamera = () => {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

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
      console.log('Picture taken:', uri);
      setCapturedImage(uri);
      setIsRecording(false);
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

  function goBackToCamera() {
    setCapturedImage(null);
  }

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  return (
    <View style={styles.body}>
      {capturedImage ? (
        <Image source={{ uri: capturedImage }} style={[styles.capturedImage, type === Camera.Constants.Type.front && { transform: [{ scaleX: -1 }] }]} />
      ) : (
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
      )}
      {capturedImage && (
        <TouchableOpacity style={styles.goBackButton} onPress={goBackToCamera}>
          <Text style={styles.goBackText}>Go Back to Camera</Text>
        </TouchableOpacity>
      )}
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