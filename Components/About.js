import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text, Alert } from 'react-native';
import Canvas from 'react-native-canvas';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const ScratchCard = () => {
  const [scratched, setScratched] = useState(false);
  const [percent, setPercent] = useState(0);
  const canvasRef = useRef(null);
  const scContainerRef = useRef(null);
  const imageForwardRef = useRef(null);
  const No = 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageForward = imageForwardRef.current;

    imageForward.onload = () => {
      canvas.width = width;
      canvas.height = 300;
      context.drawImage(imageForward, 0, 0, width, 300);
      context.globalCompositeOperation = 'destination-out';
    };
  }, []);

  const handlePan = (event) => {
    const { nativeEvent } = event;
    const { state, x, y } = nativeEvent;

    if (state === State.ACTIVE) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.beginPath();
      context.arc(x, y, 30, 0, 2 * Math.PI, false);
      context.fill();

      checkScratchCompletion();
    }
  };

  const checkScratchCompletion = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let scratchedPixels = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      if (imageData[i + 3] === 0) {
        scratchedPixels++;
      }
    }

    const scratchedPercentage = (scratchedPixels / (canvas.width * canvas.height)) * 100;
    setPercent(scratchedPercentage.toFixed(0));
    if (scratchedPercentage > 50 && !scratched) {
      setScratched(true);
      Alert.alert('Congratulations!', 'You have scratched enough!', [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      <View ref={scContainerRef} style={styles.scContainer}>
        <Image ref={imageForwardRef} source={require('../assets/scratch.jpeg')} style={styles.image} />
        <Image source={require('../assets/foretpass.jpg')} style={styles.backgroundImage} />
        <View style={styles.innerHtml}>
          <Text style={styles.number}>{No}</Text>
        </View>
        <Canvas ref={canvasRef} style={styles.canvas} />
        <PanGestureHandler onGestureEvent={handlePan}>
          <View style={StyleSheet.absoluteFill} />
        </PanGestureHandler>
      </View>
      <Text style={styles.percentText}>{percent}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 300,
    position: 'relative',
  },
  scContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    display: 'none',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  innerHtml: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  canvas: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  percentText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ScratchCard;
