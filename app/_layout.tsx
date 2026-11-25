import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { petaFont } from '../src/ui/fonts';
import { varsTema } from '../src/ui/themeVars';
import '../global.css';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontDimuat] = useFonts(petaFont);
  const { colorScheme } = useColorScheme();
  const [waktuHabis, setWaktuHabis] = useState(false);

  // Jangan blokir splash lebih dari 1,5 detik (DESIGN §4).
  useEffect(() => {
    const pengatur = setTimeout(() => setWaktuHabis(true), 1500);
    return () => clearTimeout(pengatur);
  }, []);

  const siap = fontDimuat || waktuHabis;
  useEffect(() => {
    if (siap) SplashScreen.hideAsync();
  }, [siap]);

  if (!siap) return null;

  return (
    <View
      style={varsTema(colorScheme === 'dark' ? 'dark' : 'light')}
      className="flex-1 bg-paper"
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
