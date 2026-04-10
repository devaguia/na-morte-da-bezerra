import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'BJCree-Regular': require('../assets/fonts/BJCree-Regular.ttf'),
    'BJCree-Medium': require('../assets/fonts/BJCree-Medium.ttf'),
    'BJCree-SemiBold': require('../assets/fonts/BJCree-SemiBold.ttf'),
    'BJCree-Bold': require('../assets/fonts/BJCree-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="topic" />
      <Stack.Screen
        name="suggest"
        options={{ presentation: 'transparentModal' }}
      />
    </Stack>
  );
}
