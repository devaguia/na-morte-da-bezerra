import { useCallback, useEffect, useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { shareDownloadLink } from '../utils/share';

const BG_COLOR = '#FBF3EB';
const LOGO_SIZE_RATIO = 0.40;

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

  const logoSize = width * LOGO_SIZE_RATIO;

  const handleShareDownload = useCallback(async () => {
    await shareDownloadLink();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <Pressable style={styles.screen} onPress={() => router.push('/topic')}>
        <Image
          source={require('../assets/bezerra.png')}
          style={{ width: logoSize, height: logoSize }}
          resizeMode="contain"
        />

        <Text style={styles.appName}>Na Morte da Bezerra!</Text>

        <Animated.Text style={[styles.instruction, { opacity }]}>
          Clique na tela para começar a pensar!
        </Animated.Text>
      </Pressable>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleShareDownload}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="share-social-outline" size={22} color="#3D2B1F" opacity={0.5} />
        </TouchableOpacity>
      </View>
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
    gap: 20,
  },
  appName: {
    fontFamily: 'BJCree-Bold',
    fontSize: 18,
    color: '#3D2B1F',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  instruction: {
    fontSize: 16,
    fontFamily: 'BJCree-Medium',
    color: '#3D2B1F',
    textAlign: 'center',
    paddingHorizontal: 60,
    marginTop: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
});
