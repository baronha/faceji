import { View, Text } from 'react-native';
import React from 'react';
import { Container } from 'component';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

const Home = () => {
  const device = useCameraDevice('front');

  if (device == null) {
    return null;
  }

  return (
    <Container>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </Container>
  );
};

export default Home;
