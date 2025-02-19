import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const App = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleCameraRef = (ref) => {
    setCameraRef(ref);
  }

  const switchCamera = async () => {
    try {
      setType(
        type === CameraType.back ? CameraType.front : CameraType.back
      );
    } catch (error) {
      console.error('Error switching cameras:', error);
    }
  }

  if (hasPermission === null) {
    return <View><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={handleCameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={switchCamera}
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Flip</Text>
            </TouchableOpacity>
          </View>
      </Camera>
    </View>
  );
};
export default App;
