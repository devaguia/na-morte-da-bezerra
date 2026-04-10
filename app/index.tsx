import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const BG_COLOR = '#FBF3EB';
const ILLUSTRATION_SIZE_RATIO = 0.7;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );

    pulse.start();

    return () => {
      pulse.stop();
    };
  }, [opacity]);

  const illustrationSize = width * ILLUSTRATION_SIZE_RATIO;

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable style={styles.screen} onPress={() => router.push('/topic')}>
        <View style={[styles.illustration, { width: illustrationSize, height: illustrationSize }]} />
        <Animated.Text style={[styles.instruction, { opacity }]}>
          Clique na tela para começar a pensar
        </Animated.Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  illustration: {
    borderRadius: 12,
  },
  instruction: {
    fontSize: 18,
    fontWeight: '500',
    color: '#3D2B1F',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
